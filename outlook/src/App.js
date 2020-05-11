import React from 'react';
import './App.css';
import Header from './common/Header';
import EmailList from './common/EmailList';
import inbox from './data/inbox.json';
import spam from './data/spam.json';
import deleteItems from './data/delete.json';
import custom from './data/custom.json';
import { Row, Col, Button, Accordion} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    let folder = this.props.match.params.folder ? this.props.match.params.folder : 'inbox';
    this.state = {
      inbox,
      spam,
      deleteItems,
      custom,
      folder
    }
  }
  changeFolderSelection(key) {
    this.setState({
      folder: key
    })
  }
  emailActionIndex = (mId)=>{
    let type = this.state.folder;
    let index = this.state[type].findIndex(val => val.mId === mId);
  return index;
  }

  deleteEmail = (mId) => {
   let  selectedindex= this.emailActionIndex(mId);
   let type = this.state.folder;
    let deleteItem = this.state[type].splice(selectedindex, 1);
    if(type!=='deleteItems')
    this.state.deleteItems.push(deleteItem[0]);
    this.setState({type:this.state[type]})
  }
  changeUnread = (mId) => {
    let type = this.state.folder;
    let  selectedindex= this.emailActionIndex(mId);
    this.state[type][selectedindex].unread = false;
    this.setState({type:this.state[type]})
  }
  changeFlag = (mId) => {
    let type = this.state.folder;
    let  selectedindex= this.emailActionIndex(mId);
    this.state[type][selectedindex].flag = !this.state[type][selectedindex].flag;
    this.setState({type:this.state[type]})
  }
  flagFilter = (event) => {
    let type = this.state.folder;
    let flagList = event.target.value == 1 ? this.state[type].filter(val => val.flag) : inbox;
    this.state[type] = flagList
    this.setState({type})
  }
  render() {
    if(this.props.match.params.folder === undefined) {
      return <Redirect to='/inbox' />
    }
    let activeFolder = this.props.match.params.folder ? this.props.match.params.folder : 'inbox';
    let inboxUnread = this.state.inbox.filter(val => val.unread);
    let spamUnread = this.state.spam.filter(val => val.unread);
    let deleteUnread = this.state.deleteItems.filter(val => val.unread);
    let customUnread = this.state.custom.filter(val => val.unread);
  return (
    <div>
      <Header />
      <Row className='m-0 min-vh-100'>
        <Col className='col-sm-12 col-md-2 email-border-right'>
          <Accordion defaultActiveKey="0">
                <Accordion.Toggle as={Button} variant="link" eventKey="0" className='d-block p-0 pb-2'>
                  Folders
                </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <>
                <Link  to="/inbox" onClick={() => this.changeFolderSelection('inbox')} className='d-block pl-3 pb-2 text-left'>Inbox {inboxUnread.length > 0 && `(${inboxUnread.length})`}</Link>
                <Link  to="/spam" onClick={() => this.changeFolderSelection('spam')} className='d-block pl-3 pb-2 text-left'>Spam {spamUnread.length > 0 && `(${spamUnread.length})`}</Link>
                <Link  to="/deleteItems" onClick={() => this.changeFolderSelection('deleteItems')} className='d-block pl-3 pb-2 text-left'>Deleted Items {deleteUnread.length > 0 && `(${deleteUnread.length})`}</Link>
                <Link  to="/custom" onClick={() => this.changeFolderSelection('custom')} className='d-block pl-3 pb-2 text-left'>Custom Folder {customUnread.length > 0 && `(${customUnread.length})`}</Link>
                </>
              </Accordion.Collapse>
          </Accordion>
        </Col>

        <EmailList
          data={this.state[activeFolder]}
          deleteEmail={this.deleteEmail}
          changeUnread={this.changeUnread}
          changeFlag={this.changeFlag}
          flagFilter={this.flagFilter}
          type={activeFolder} />
        
      </Row>
    </div>
  );
  }
}

export default App;
