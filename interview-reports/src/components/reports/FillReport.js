import React from 'react';
import { dateMaxFormatter } from '../../assets/js/helpers';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class FillReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interviewDate: moment(),
            phase: "",
            status: "",
            note: ""
        };
    }

    componentDidMount() {
        window.$(document).ready(function () {
            window.$('#textarea').characterCounter();
            window.$('select').select();
        });
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    handleDateChange = (date) => {
        this.setState({
            interviewDate: date
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newReportData = { ...this.state };
        const format = 'L';
        const momentDate = newReportData.interviewDate.format(format);
        newReportData.interviewDate = (new Date(momentDate)).toString();
        this.props.handleCreateReport(newReportData);
    }

    render() {
        const dateMax = dateMaxFormatter();

        return (
            <div className="row">
                <form id="submit-report" className="col s12" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col s12 m8 offset-m2 l4 input-field ">
                            <DatePicker
                                selected={this.state.interviewDate}
                                onChange={this.handleDateChange}
                            />
                            {/* <input type="date" min="2016-01-01T00:00" max={dateMax}
                                placeholder="Choose date" name="interviewDate"
                                onChange={this.handleChange} value={this.state.interviewDate} required /> */}
                            <label className="active">Interview date</label>
                        </div>
                        <div className="input-field col s12 m8 offset-m2 l4">
                            <select onChange={this.handleChange} name="phase" value={this.state.phase} required>
                                <option value="" defaultValue>Choose phase</option>
                                <option value="cv">CV</option>
                                <option value="hr">HR</option>
                                <option value="tech">Tech</option>
                                <option value="final">Final</option>
                            </select>
                            <label>Phase</label>
                        </div>
                        <div className="input-field col s12 m8 offset-m2 l4">
                            <select onChange={this.handleChange} value={this.state.status} name="status" required>
                                <option value="" defaultValue>Choose status</option>
                                <option value="declined">Declined</option>
                                <option value="passed">Passed</option>
                            </select>
                            <label>Status</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea id="textarea" className="materialize-textarea" data-length="120" name="note"
                                onChange={this.handleChange} value={this.state.note} required></textarea>
                            <label htmlFor="textarea2">Note</label>
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="waves-effect waves-light btn indigo darken-4 submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}