/* pages/index.js */
// const fs = require('fs')

import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";

import {
  nftaddress, nftmarketaddress, mytokenaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import MyToken from '../artifacts/contracts/MyToken.sol/MyToken.json'


const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  top: 150px;
`;

const spinner = css`
  top: 150;
  z-index: 100;
  width: 100%;
  height: 100%;
  /* display: none; */
  background: rgba(0,0,0,0.6);
`;
const imageStyle = {
  width: '300px',
  height: '300px'
};



export default function Home() {
  const [imageName, setImageName] = useState(0)
  const [minted, setMinted] = useState(0);
  const [total, setTotal] = useState(0);

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  
  useEffect(async () => {
      await getMintCount();
      setInterval(() => {
          var i = Math.floor(Math.random() * 10);
          setImageName(i.toString());
          
      }, 1000);
  }, [])

  async function getMintCount() {
    var resp = await axios.get('api/getMintCounts');
    // alert(JSON.stringify(resp.data))
    setMinted(resp.data.minted);
    setTotal(resp.data.total);
}

  async function mint() {
    setLoading(true);
    try {
      var res = await axios.get('api/getImage');
      const url = res.data.image_url;
      const mintIndex = res.data.mintIndex;

      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)    
      const signer = provider.getSigner()
      
      let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
      
      let transaction = await contract.createToken(url)
      let tx = await transaction.wait()
      let event = tx.events[0]
      let value = event.args[2]
      let tokenId = value.toNumber()

      await axios.post('api/confirmMinted', {mintIndex});
      await getMintCount();
      setLoading(false);
    } catch (e) {
      await getMintCount();
      setLoading(false);
    }
    
  }

  return (
    <section className="author-area">
      <div className="container">
        <div className="row justify-content-center">
            <div className="col-12 col-sm-6 col-lg-4 item">
              <div className="card">
                <div className="image-over">
                  <a href="#">
                    {
                      loading && (
                        <div style={imageStyle} >
                          <DotLoader color={color} loading={loading} css={override} size={50} />
                        </div>

                      )
                    }
                    {
                      !loading && (
                        <img style={imageStyle} className="card-img-top" src={"rnds/" + imageName + '.png'} alt="" />
                      )
                    }
                    
                  </a>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                  {/* Card Body */}
                  <div className="card-body">
                    <div className="seller d-flex align-items-center my-3">
                      <span>MintPrice: 0.033 ETH</span>
                    </div>
                    <div className="seller d-flex align-items-center my-3">
                      <span>AmountMinted: {minted}</span>
                    </div>
                    <div className="seller d-flex align-items-center my-3">
                      <span>AmountLeft: {50-minted}</span>
                    </div>
                    <div className="col-12">
                    {
                      loading && (
                        <span className="btn w-100 mt-3 mt-sm-4">loading....</span>
                      )
                    }
                    {
                      !loading && (
                        <button className="btn w-100 mt-3 mt-sm-4" type="button" onClick={mint}>Mint</button>
                      )
                    }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
    
  )
}
