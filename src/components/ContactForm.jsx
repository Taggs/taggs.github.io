import { useState } from 'react'
import { motion } from 'framer-motion'

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  message: '',
}

const FORM_FIELDS = [
  { id: 'name', type: 'text', label: 'Name', required: true },
  { id: 'email', type: 'email', label: 'Email', required: true },
  { id: 'message', type: 'textarea', label: 'Message', required: true, rows: 6 },
]

const INPUT_CLASSES = "w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
const LABEL_CLASSES = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const renderField = ({ id, type, label, required, rows }) => (
    <div key={id}>
      <label htmlFor={id} className={LABEL_CLASSES}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={formData[id]}
          onChange={handleChange}
          required={required}
          rows={rows}
          className={INPUT_CLASSES}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={formData[id]}
          onChange={handleChange}
          required={required}
          className={INPUT_CLASSES}
        />
      )}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {FORM_FIELDS.map(renderField)}
      
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 px-6 text-white bg-primary hover:bg-primary-dark rounded-md transition-colors duration-300"
      >
        Send Message
      </motion.button>
    </form>
  )
}
