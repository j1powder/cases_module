'use client'

import React, { useState } from 'react';
//import { Order } from '../types/order';
import { useOrders } from '../hooks/useOrders';
import { Plus, X, Save, AlertCircle } from 'lucide-react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';  
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';

import styles from './OrderForm.module.css';

const OrderForm = ({ onClose, onSuccess }) => {
 const [formData, setFormData] = useState({});

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  console.log(formData);

  return (
    <div>
        <form >
            <h3 className="m-12 font-bold">Case Information</h3>
            <div className="grid grid-cols-2 gap-8 m-12">
            <div className={styles.section1}>
            <label>Subject</label>
            <InputText onChange={(e)=>setFormData({...formData, subject:e.target.value})} />
            <label>Account Name</label>
            <InputText onChange={(e)=>setFormData({...formData, accountName:e.target.value})} /> 
            <label>Child Account</label>
            <InputText />
            <label>Premier Account?</label>
            <InputText />
                </div>

                <div className={styles.section1}>
            <label>Priority</label>
            <InputText />
            <label>Status</label>
            <InputText />
            <label>Case Re-Open Date</label>
            <InputText />
            <label>Account Owner</label>
            <InputText />

            <label>Case Owner</label>
            <InputText />
            <label>Case Origin</label>
            <InputText />
                </div>


            </div>
            <div className="m-12">
            <Divider />
            </div>
            <h3 className="m-12 font-bold">Case Order Information</h3>
            <div className="grid grid-cols-2 gap-8 m-12">
                <div className={styles.section1}>
            <label>Type</label>
            <InputText />
            <label>Case Difficulty</label>
            <InputText />
            <label>Document Type</label>
            <InputText />
            <label>Logo?</label>
            <InputText />
            <label>TPA</label>
            <InputText />
            <label>Reference Docs</label>
            <InputText />
                </div>

                <div className={styles.section1}>
            <label>Send Document to Client for Review?</label>
            <InputText />
            <label>Programs Upload Allowed</label>
            <InputText />
            <label>Language</label>
            <InputText />
            <label>Contact for Safety Documents</label>
            <InputText />

            <label>Email Contact For Safety Documents</label>
            <InputText />
            <label>Additional Contacts</label>
            <InputText />
                </div>
            </div>

            <div className="m-12">
            <Divider />
            </div>
            <h3 className="m-12 font-bold">Main Case Notes</h3>
            <div className="grid grid-cols-2 gap-8 m-12">
            <div className={styles.section1}>
            <label>Main Case Notes</label>
            <InputTextarea rows={5} />
            <label>Login Information</label>
            <InputTextarea rows={5} />
            </div>
            </div>

            <div className="m-12">
            <Divider />
            </div>

            <h3 className="m-12 font-bold">Safety Programs Detail</h3>
            <div className="grid grid-cols-2 gap-8 m-12">
                <div className={styles.section1}>
            <label>Number of Programs</label>
            <InputText />
            <label>US Programs Needed</label>
            <InputText />
            <label>Transmission, Distribution and Generation</label>
            <InputText />
            <label>SMI - Safety Maturity Index</label>
            <InputText />
                </div>

                <div className={styles.section1}>
            <label>Safety Coordinator Name</label>
            <InputText />
            <label>Canadian Programs Needed</label>
            <InputText />
            <label>Mexico Programs</label>
            <InputText />
            <label>Global Programs Needed</label>
            <InputText /> 
                </div>
            </div>
            <div className="m-12">
            <Divider />
            </div>

            <h3 className="m-12 font-bold">Training Document Details</h3>
            <div className="grid grid-cols-2 gap-8 m-12">
                <div className={styles.section1}>
            <label>Number of Documents</label>
            <InputText />
            <label>Canadian Training Documents Needed</label>
            <InputText />

                </div>

                <div className={styles.section1}>
            <label>Instructor Name</label>
            <InputText />
            <label>Attendees</label>
            <InputText />
                </div>
            </div>

            <div className="m-12">
            <Divider />
            </div>

            <h3 className="m-12 font-bold">Interview Questions Details</h3>
            <div className="grid grid-cols-2 gap-8 m-12">
            <div className={styles.section1}>
            <label>Document Quantity</label>
            <InputText />
            <label>US Interview Question Documents</label>
            <InputText />
            <label>Canadian Interview Question Documents</label>
            <InputText />

                </div>

                <div className={styles.section1}>
            <label>Instructor Name</label>
            <InputText />
            <label>Employees</label>
            <InputText />
                </div>
            </div>

        </form>
    
    </div>
  );
};

export default OrderForm;