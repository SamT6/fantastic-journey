'use strict';

class NFTUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedFile: null, ipfs_url: '' };
  }

  fileChangedHandler = (event) => {
    const file = event.target.files[0]
    this.setState({ selectedFile: file })
    console.log('file loaded!')


    var reader = new FileReader();
    var imgtag = document.getElementById("upload-image");
    imgtag.title = file.name;

    reader.onload = function(event) {
        imgtag.src = event.target.result;
    };

    reader.readAsDataURL(file);
  }

  uploadHandler(){
    console.log(this.state.selectedFile);
    // api key will be changed after this project!
    const api_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8MjY1NDczNDQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxNjE2MDE1OTkzNiwibmFtZSI6ImRlZmF1bHQifQ.PN5stEzYqs2GE_X04LfB78iGAxMAsnUjbqTSBfYFTNM'

    const Http = new XMLHttpRequest();
    const url = "https://api.nft.storage/upload";
    Http.open("POST", url);
    Http.setRequestHeader('Authorization', 'Bearer ' + api_key);

    Http.send(this.state.selectedFile);
    
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      const json = JSON.parse(Http.responseText)
      this.setState({ipfs_url: json.value.cid})
    }
  }

  render() {
    if (this.state.ipfs_url != '') {
      return(
          <div>
            <h4 class="text-white text-center">IPFS CID: {this.state.ipfs_url}</h4>
          </div>
      );
    }

    return (
        <div>
            <input type="file" onChange={this.fileChangedHandler} />
            <button onClick={() => this.uploadHandler()}>Upload!</button>
            <br/>
            <img id="upload-image" width="200"></img>
        </div>
      
    );
  }
}

let domContainer = document.querySelector('#nft_upload_container');
ReactDOM.render(<NFTUpload />, domContainer);