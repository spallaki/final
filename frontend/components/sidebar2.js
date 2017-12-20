
componentDidMount() {
    fetch(`${DOMAIN}/addPicture`, {
      method: 'GET',
    }
    ).then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      /* do something with responseJson and go back to the Login view but
       * make sure to check for responseJson.success! */
       if(responseJson.success){
           // return this.props.navigation.goBack();
          this.setState({image: responseJson.photo})
       }else{
           console.log('THERE WAS AN ERROR FINDING PICTURE', responseJson.error);
       }
    })
    .catch((err) => {
        console.log('no picture found');
        alert(err)
      /* do something if there was an error with fetching */
    });
  }






//in the render/return:
{this.state.image ? <Image source={{ uri: this.state.image }} style={{ width: 75, height: 75, marginTop: 25 }} /> : null}
