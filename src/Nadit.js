import './App.css'
import { useState } from 'react'
import { ethers } from 'ethers'
import Wave from './artifacts/contracts/WavePortal.sol/WavePortal.json'

// update with the contact address logged out to thr cli it was deployed
const greeterAddress = '0x4d8E02BBfCf205828A8352Af4376b165E123D7b0'
// 0x4d8E02BBfCf205828A8352Af4376b165E123D7b0 - buildspaces

function App() {
  // store greeting in local state
  const [greeting, setGreetingValue] = useState()
  const [ibalance, setBalance] = useState()

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        console.log(accounts)

        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        // async const balance =  provider.getBalance('0x4d8E02BBfCf205828A8352Af4376b165E123D7b0')
        console.log(accounts)
      })
  }

  const requestBalance = async () => {
    const { ethereum } = window
    let myBal = 0;
    await ethereum.request({ method: 'eth_requestAccounts' }).then((accnt) => {
      console.log(accnt[0])
      const account = accnt[0]
      myBal = account;
      return myBal;
    })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const balance = await provider.getBalance(myBal)
    const realBalance = ethers.utils.formatEther(balance)
    setBalance(realBalance)
  }

  // call the smart contract, read the current greeting value
  // async function fetchGreeting() {
  //   if (typeof window.ethereum !== 'undefined') {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
  //     try {
  //       const data = await contract.greet()
  //       alert( data);
  //       console.log('data: ', data)
  //     } catch (err) {
  //       console.log("Error: ", err);
  //     }
  //   }
  // }

  // call the smart contract, send an update
  // async function setGreeting() {
  //   if (!greeting) return
  //   if (typeof window.ethereum !== 'undefined') {
  //     await requestAccount()
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner()
  //     const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
  //     const transaction = await contract.setsGreeting(greeting)
  //     await transaction.wait()
  //     fetchGreeting()
  //   }
  // }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={requestAccount}>request account</button>
        <button onClick={requestBalance}>get balance</button>
        {/* <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" /> */}
        {/* <button onClick={setGreeting}>Set Greeting</button> */}
        {ibalance}
      </header>
    </div>
  )
}

export default App
