import * as React from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './artifacts/contracts/WavePortal.sol/WavePortal.json';

export default function App() {


  const [currAccount, setCurrAccount] = React.useState()
  const contractAddress = "0x7C10A8944Baa22A41a51B82DC419e866a04e55dB"
  const contractABI = abi.abi
  const [totalWaves, setTotalWaves] = React.useState()
  const loading = React.useState(false)
  const [allWaves, setAllWaves] = React.useState([])


  const checkWallet = () => {

    const { ethereum } = window;
    if(!ethereum) {
      console.log("please install metamask");
      return
    } else {
      console.log('metamask dey here', ethereum)
    }

      ethereum.request({method: 'eth_accounts'})
        .then(accounts => {
          if (accounts.length !== 0 ) {
            const account = accounts[0]
            console.log("we have an authorized account", account)
            setCurrAccount(account)
          } else (
            console.log('no authorized account found')
          )
        })
  }

  const connectWallet = () => {
    const { ethereum } = window;
    if(!ethereum) {
      alert('get metamask!');
    }

    ethereum.request({method: 'eth_requestAccounts'})
    .then(accounts => {
      console.log('Connected', accounts[0])
      setCurrAccount(accounts[0])

    }).catch(err => console.log(err))
  }


  const wave = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const waveContract = new ethers.Contract(contractAddress, contractABI, signer)

    let count = await waveContract.getTotalWaves()
    let waves = count.toNumber()
    console.log('total number of waves...', count.toNumber())

    setTotalWaves(waves)

    let waveTxn = await waveContract.wave('the message!');
    console.log('mining...', waveTxn.hash)
    await waveTxn.wait()


    console.log('minned --', waveTxn.hash)

    let allWaves = await waveContract.getTotalWaves()
    console.log(allWaves) 
  }


  const getAllWaves = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const wavePortalContract = ethers.Contract(contractAddress, contractABI, signer)

    let waves = await wavePortalContract.getAllWaves()

    let wavesCleaned = []
    waves.forEach(wave => {
      wavesCleaned.push({
        address: wave.address,
        timestamp: new Date(wave.timestamp * 1000),
        message: wave.message
      })
      setAllWaves(wavesCleaned)
    })
  }

  React.useEffect(() => {
    checkWallet();
    // getAllWaves();
  },[])
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am yinka and a super creative self taught software engineer. say hi!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        <p>total numbers of waves: { !loading ? <p>loading...</p> : totalWaves }</p>
        <button onClick={connectWallet}> Connect Wallet </button>
        <p>connected account = {currAccount} </p>

        {allWaves.map((wave, index) => {
          return(
          <div style={{backgroundColor: 'oldLace', marginTop: '16px', padding: '6px'}}>
            <div>address: {wave.address}</div>
            <div>time: {wave.timestamp.toString()}</div>
            <div>message: {wave.message}</div>

          </div>
          )
        } )}

      </div>
    </div>
  );
}
