import React, { useEffect, useState } from 'react'
import "./home.css"
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'
import TransactionCard from './../../components/card/transactionCard'
import Add from "./add-btn.png"
import { Link } from 'react-router-dom'

function Home() {
  const [user, setUser] = useState('')
  const [transactions, setTransactions] = useState([])
  const [netIncome, setNetIncome] = useState(0)
  const [netExpense, setNetExpense] = useState(0)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if(currentUser){
      setUser(currentUser)
    }

    if(!currentUser){
      window.location.href = '/login'
    }
  }, [])

  const loadTransactions = async () => {
    if(!user._id){
      return
    }
    toast.loading('Loading transactions...')

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions?userId=${user._id}`)

    const allTransactions = response.data.data
    toast.dismiss()

    setTransactions(allTransactions)
  }

  useEffect(() => {
    loadTransactions()
  }, [user])

  useEffect(() => {
    let income = 0
    let expense = 0

    transactions.forEach((transaction) => {
      if (transaction.type === 'credit') {
        income += transaction.amount
      }
      else{
        expense += transaction.amount
      }
    })

    setNetIncome(income)
    setNetExpense(expense)
  }, [transactions])

  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");
  const [greetDate, setGreetDate] = useState("");

  useEffect(() => {
      const updateTimeAndGreeting = () => {
          const date = new Date();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const formattedHours = hours % 12 || 12;
          const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
          const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
          const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const dateString = `${day}/${month}/${year}`;

          let greetingMessage = "";
          if (hours >= 5 && hours < 12) {
              greetingMessage = "Good Morning!";
          } else if (hours >= 12 && hours < 17) {
              greetingMessage = "Good Afternoon!";
          } else if (hours >= 17 && hours < 22) {
              greetingMessage = "Good Evening!";
          } else {
              greetingMessage = "Good Night!";
          }

          setTime(timeString);
          setGreetDate(dateString);
          setGreeting(greetingMessage);
      };

      updateTimeAndGreeting();
      const interval = setInterval(updateTimeAndGreeting, 1000);

      return () => clearInterval(interval);
  }, []);


  return (
    <>
      <div className="greeting-header">
            <div className="greeting-content">
                <h1 className="greet"><span className='user-name'>Hello {user.fullName}</span>{greeting}</h1>
                <div className="time-date-wrapper">
                    <h4 className="time">{time}</h4>
                    <span className="separator">|</span>
                    <h4 className="date">{greetDate}</h4>
                </div>
            </div>
        </div>

       <div className='body'>
         
<h2 className='home-heading'>Welcome to the Expense Tracker</h2>



<div className='net-transactions-values'>

  <div className='net-transactions-item'>
    <span className='net-transactions-amount'>
      + {netIncome}
    </span>
    <span className='net-transactions-title'>
      Net Income
    </span>
  </div>

  <div className='net-transactions-item'>
    <span className='net-transactions-amount'>
      - {netExpense}
    </span>
    <span className='net-transactions-title'>
     Net Expense
    </span>
  </div>

  <div className='net-transactions-item'>
    <span className='net-transactions-amount'>
      {netIncome - netExpense}
    </span>
    <span className='net-transactions-title'>
      Net Balance
    </span>
  </div>

</div>

<div className='transactions-container'>
  {
    transactions.map((transaction) => {
      const {_id, title, amount, category, type, createdAt} = transaction

      return (<TransactionCard
        key={_id}
        _id={_id}
        title={title}
        amount={amount}
        category={category}
        type={type}
        createdAt={createdAt}
        loadTransactions={loadTransactions}
      />)
    })
  }
</div>

<span className='home-logout' onClick={() => {
  localStorage.clear()
  toast.success('Logged out successfully')

  setTimeout(()=>{
    window.location.href = '/login'
  }, 3000)
}}>
  Logout
</span>

<Link to='/add'>
  <img src={Add} alt='Transaction adding img' title='Add tran' className='add-transaction' />
</Link>
       </div>

      <Toaster />
    </>    
  )
}

export default Home