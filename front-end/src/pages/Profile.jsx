import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { profile, updateData } from '../features/auth/authSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userToken, firstName, lastName } = useSelector((state) => state.auth)
  const authFirstName = useSelector((state) => state.auth.firstName)
  const authLastName = useSelector((state) => state.auth.lastName)

  useEffect(() => {
    if (!userToken) {
      navigate('/login')
    }
    navigate('/profile')
    dispatch(profile())
  }, [userToken, navigate, dispatch])

  //Edit form mode
  const [editNameForm, setEditNameForm] = useState(false)
  const [editBackground, setEditBackground] = useState(false)

  const editForm = (e) => {
    e.preventDefault()
    setEditNameForm(!editNameForm)
    setEditBackground(!editBackground)
  }

  //form values
  const [updateFirstName, setUpdateFirstName] = useState('')
  const [updateLastName, setUpdateLastName] = useState('')

  const onSave = (e) => {
    e.preventDefault()
    const userUpdateData = {
      firstName: updateFirstName ? updateFirstName : firstName,
      lastName: updateLastName ? updateLastName : lastName,
    }
    dispatch(updateData(userUpdateData))
    console.log(userUpdateData)
    setEditNameForm()
    // setEditBackground()
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {authFirstName + ' ' + authLastName}
        </h1>
        {/* <button className="edit-button">Edit Name</button> */}
        {editNameForm ? (
          <form className="edit-form">
            <div className="input-wrapper edit">
              <label htmlFor="firstName"></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder={firstName}
                required
                onChange={(e) => setUpdateFirstName(e.target.value)}
              />
              <label htmlFor="lastName"></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder={lastName}
                required
                onChange={(e) => setUpdateLastName(e.target.value)}
              />
            </div>

            <div className="edit-buttons">
              <button className="edit-button" type="submit" onClick={onSave}>
                Save
              </button>
              <button className="edit-button" type="submit" onClick={editForm}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <button className="edit-button" onClick={editForm}>
              Edit Name
            </button>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}

export default Profile
