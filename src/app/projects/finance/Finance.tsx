'use client'

import Button from '@/components/Button'
import { useState } from 'react'
import ReceiptUpload from './ReceiptUpload'
import { accounts, expenses } from './sensitive'

export default function Finance() {
  const [loggedIn, setLoggedIn] = useState(false)

  return !loggedIn ? (
    <div>
      <p>{'This page requires being logged in to view. Please log in.'}</p>
      <Button level={1} onClick={() => setLoggedIn(true)}>
        Log in
      </Button>
    </div>
  ) : (
    <div>
      <p>{'Welcome to the finance tracker'}</p>
      <Button level={2} onClick={() => setLoggedIn(false)}>
        Log out
      </Button>
      <div>
        {'Receipt upload'}
        {/* <ReceiptUpload /> */}
      </div>
      <div>
        {'Track current account, revolut account, credit card account'}
        <h4>Accounts</h4>
        <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: '1rem' }}>
          {accounts.map((account) => {
            return (
              <div
                key={account.id}
                style={{
                  padding: '1rem',
                  background: 'var(--bg)',
                  borderRadius: '5px',
                  border: '1px solid var(--bg-light)'
                }}
              >
                <h5>{account.name}</h5>
                <p>Type: {account.type}</p>
                <p>Provided by: {account.provider}</p>
                <p>Balance: €{account.balance.toFixed(2)}</p>
              </div>
            )
          })}
          <div
            style={{
              padding: '1rem',
              background: 'var(--bg)',
              borderRadius: '5px',
              border: '1px solid var(--bg-light)'
            }}
          >
            <h5>+</h5>
            <p>Add account</p>
          </div>
        </div>
      </div>
      <div>{'Track regular payments i.e. subscriptions, payments due'}</div>
      <div>{'Track income, expected or sporadic'}</div>
      <div>
        {'Expenses with categorisation'}
        <table
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(10, 1fr)',
            rowGap: '0.5rem',
            width: '100%',
            background: 'var(--bg)',
            padding: '1rem 2rem',
            borderRadius: '5px',
            border: '1px solid var(--bg-light)'
          }}
        >
          <tr
            style={{
              display: 'grid',
              gridColumn: '1 / -1',
              gridTemplateColumns: 'subgrid'
            }}
          >
            <th>Item</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
          {expenses.slice(0, 9).map((exp) => {
            return (
              <tr
                style={{
                  display: 'grid',
                  gridColumn: '1 / -1',
                  gridTemplateColumns: 'subgrid'
                }}
              >
                <td>{exp.item}</td>
                <td>{exp.description}</td>
                <td>{exp.category}</td>
                <td>{exp.date.toDateString()}</td>
                <td style={{ textAlign: 'end' }}>{exp.price}</td>
              </tr>
            )
          })}
          <tr>
            <td>Add new expense...</td>
          </tr>
        </table>
      </div>
    </div>
  )
}
