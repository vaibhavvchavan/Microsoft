import React, { Component } from 'react';
import { Col, Form } from 'react-bootstrap';
import EmailPreview from './EmailPreview';

class EmailList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewKey: {
                inbox: 0,
                spam: 0,
                deleteItems: 0,
                custom: 0
            },
            flag: 0
        }
    }
    componentDidMount() {
        if(document.querySelector('.email-list:first-child'))
        document.querySelector('.email-list:first-child').focus();
    }
    createMarkup(data) {
        return { __html: data };
    }
    changeActiveEmail(key) {
        let previewKeyObj = { ...this.state.previewKey};
        previewKeyObj[this.props.type] = key;
        this.setState({
            previewKey: previewKeyObj
        })
    }
    flagFilter(event) {
        this.setState({
            flag: event.target.value
        });
        this.props.flagFilter(event)
    }
    render() {
        let flagFilter = <div className='p-2 bg-primary text-white'>
            <p className='text-capitalize d-inline-block m-0 p-2'>
                <b>{this.props.type}</b>
            </p>
            {this.props.type === 'inbox' && <Form onChange={(event) => this.flagFilter(event)} className='float-right'>
                <Form.Group>
                    <Form.Control as="select" custom defaultValue={this.state.flag}>
                        <option value='0'>All</option>
                        <option value='1'>Flag</option>
                    </Form.Control>
                </Form.Group>
            </Form>}
        </div>;

        if (this.props.data === undefined || this.props.data.length === 0) {
            return (
                <>
                    <Col className='col-sm-12 col-md-3 p-0 mb-4 email-border-right'>
                        {flagFilter}
                        <p className='p-3'>There is no item to display</p>
                    </Col>
                    <Col className='p-0 col-sm-12 col-md-7'></Col>
                </>
            )
        }
        let active;
        if (this.props.data[this.state.previewKey[this.props.type]] !== undefined) {
            active = this.props.data[this.state.previewKey[this.props.type]];
        } else {
            [active] = this.props.data;
        }
        let list = this.props.data.map((email, key) =>
            <div key={key} tabIndex='1'
                className={`py-2 email-list ${email.unread ? 'email-unread' : ''} ${email.flag ? 'email-flag' : ''} ${active.mId === email.mId ? 'email-active' : ''}`}
                onBlur={() => this.props.changeUnread(email.mId)}>
                <input type='button' value='delete' className='ml-1 float-right' onClick={() => this.props.deleteEmail(email.mId)} />
                <input type='button' value='flag' className='float-right' onClick={() => this.props.changeFlag(email.mId)} />
                <div onClick={() => this.changeActiveEmail(key)}>
                    <p className='px-2 m-0 text-overflow'>
                        <b>{email.subject}</b>
                    </p>
                    <div className='text-overflow px-2' dangerouslySetInnerHTML={this.createMarkup(email.content)} />
                </div>
            </div>
        );

        return (
            <>
                <Col className='col-sm-12 col-md-3 p-0 mb-4 email-border-right'>
                    {flagFilter}
                    <div>
                        {list}
                    </div>
                </Col>

                <Col className='col-sm-12 col-md-7 p-0'>
                    <EmailPreview subject={active.subject}
                   content = {this.createMarkup(active.content)} />
                 
                </Col>
            </>
        );
    }
}

export default EmailList;