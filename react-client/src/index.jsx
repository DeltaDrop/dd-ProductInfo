import React from 'react';
import ReactDOM from 'react-dom';
import Categories from './components/Categories.jsx';
import Pricing from './components/Pricing.jsx';
import PricingLine from './components/styled-components/PricingLine.jsx';
import ReviewInfo from './components/ReviewInfo.jsx';
import Shipping from './components/Shipping.jsx';
import JoinDropButton from './components/styled-components/JoinDropButton.jsx';
import ReminderButton from './components/styled-components/ReminderButton.jsx';
import ItemName from './components/styled-components/ItemName.jsx';
import ItemNameLine from './components/styled-components/ItemNameLine.jsx';
var axios = require('axios');

export default class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: false,
      info: {},
      categories: [],
      timeLeft: '',
      seconds: ''
    }

    this.countDown = this.countDown.bind(this);
    this.toggleReminder = this.toggleReminder.bind(this);
    this.joinDrop = this.joinDrop.bind(this);
  }

  toggleReminder() {
    this.setState({reminder: !this.state.reminder});
  }

  joinDrop() {
    axios.post('/api/drop', this.state.info)
    .then( (response) => {this.getItemData(this.state.info.name)})
    .catch ( (err) => {console.log('error on post to drop: ', err)});
  }

  getItemData(itemName) {
    axios.get('/api/' + itemName)
    .then( ({data}) => {
      this.setState({info: data[0], seconds: (new Date(data[0].time * 1000) - new Date()) / 1000});
    })
    .catch( (err) => {console.log('error on get: ', err)});
  }

  getCategories(itemName) {
    axios.get('/api/categories/' + itemName)
    .then( ({data}) => {
      this.setState({categories: data})
    })
    .catch( (err) => {console.log('error on get to categories: ', err)});
  }

  getEndPoint() {
    let url = window.location.href.split('/');
    return url[url.length - 1] || 'flashlight';
  }

  convertToTime(secs) {
    let days = Math.floor(secs / 86400);
    let hoursLeft = Math.floor(secs - (days * 86400));
    let hours = Math.floor(hoursLeft / 3600);
    let minutesLeft = Math.floor(hoursLeft - (hours * 3600));
    let minutes = Math.floor(minutesLeft / 60);
    let seconds = Math.floor(secs % 60);
    
    let obj =  {
      days: add0(days),
      hours: add0(hours),
      minutes: add0(minutes),
      seconds: add0(seconds)
    }

    return secs > 0 ? obj : secs;

    function add0(time) {
      return time > 9 ? time : "0" + time;
    }
  }

  countDown() {
    let secs = this.state.seconds - 1;
    this.setState({
      timeLeft: this.convertToTime(secs),
      seconds: secs
    })
  }

  componentDidMount() {
    this.getItemData(this.getEndPoint());
    this.getCategories(this.getEndPoint());

    setInterval(this.countDown, 1000);
  }

  render() {
    return (
      <div>
        <Categories categories={this.state.categories}/>

        <ItemNameLine>
          <ItemName>{this.state.info.name}</ItemName>
          <JoinDropButton onClick={this.joinDrop}>Join Drop</JoinDropButton>
        </ItemNameLine>
        
        <PricingLine>
          <Pricing prices={this.state.info}/>
          <ReminderButton onClick={this.toggleReminder} reminder={this.state.reminder}>Remind Me</ReminderButton>
        </PricingLine>
        
        <ReviewInfo reviews={this.state.info}/>
        <Shipping shipping={this.state.info} time={this.state.timeLeft}/>
        
      </div>
    )
  }
}

window.Info = ProductInfo;
// ReactDOM.render(<ProductInfo />, document.getElementById('product-info'));