import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from "react";

const FeedbackContext = createContext()

// Provider being exported
export const FeedbackProvider = ({ children }) => {
    // Define useState
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'Excelente serviço!',
            rating: 10
        },
        {
            id: 2,
            text: 'Pouca atenção dos atendentes...',
            rating: 6
        },
        {
            id: 3,
            text: 'Recomendo',
            rating: 7
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // FUNCTIONS

    // add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }
    // delete feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Confirm delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    // Update feedback item
    const updateFeedback = (id, updItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
        )
    }

    // Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({ item, edit: true })
    }

    // Provider: states, functions available for APP
    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider >
}

export default FeedbackContext