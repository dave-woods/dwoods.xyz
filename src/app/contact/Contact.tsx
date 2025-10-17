import styles from './contact.module.css'

export default function Contact() {
  return (
    <div>
      <form className={styles.form}>
        <div className={styles.formComponent}>
          <label htmlFor='name'>Name</label>
          <input
            placeholder='Name'
            name='name'
            id='name'
            type='text'
            autoComplete='name'
          />
        </div>
        <div className={styles.formComponent}>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            id='email'
            type='email'
            autoComplete='email'
            placeholder='name@example.com'
            required
          />
        </div>
        <div className={styles.formComponent} style={{ gridColumn: '1 / -1' }}>
          <label htmlFor='message'>Message</label>
          <textarea
            name='message'
            id='message'
            placeholder='Write your message here'
          ></textarea>
        </div>
      </form>
    </div>
  )
}
