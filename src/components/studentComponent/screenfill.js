import React, { Component } from 'react'
import styles from "./studentInput.module.css"

export default React.memo(
    class ScreenFill extends Component {
    render() {
        return (
            <div className={styles.screenfill}>
                <label for="student_password">
                    Password
                </label>
                <input type="password" min="6"/>
                <label for="Confirm_student_password">
                    Confirm Password
                </label>
                <input type="password" min="6"/>
                
            </div> 
        )
    }
}
)