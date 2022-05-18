'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NFTUpload = function (_React$Component) {
  _inherits(NFTUpload, _React$Component);

  function NFTUpload(props) {
    _classCallCheck(this, NFTUpload);

    var _this = _possibleConstructorReturn(this, (NFTUpload.__proto__ || Object.getPrototypeOf(NFTUpload)).call(this, props));

    _this.fileChangedHandler = function (event) {
      var file = event.target.files[0];
      _this.setState({ selectedFile: file });
      console.log('file loaded!');

      var reader = new FileReader();
      var imgtag = document.getElementById("upload-image");
      imgtag.title = file.name;

      reader.onload = function (event) {
        imgtag.src = event.target.result;
      };

      reader.readAsDataURL(file);
    };

    _this.state = { selectedFile: null, ipfs_url: '' };
    return _this;
  }

  _createClass(NFTUpload, [{
    key: 'uploadHandler',
    value: function uploadHandler() {
      var _this2 = this;

      console.log(this.state.selectedFile);
      // api key will be changed after this project!
      var api_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8MjY1NDczNDQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxNjE2MDE1OTkzNiwibmFtZSI6ImRlZmF1bHQifQ.PN5stEzYqs2GE_X04LfB78iGAxMAsnUjbqTSBfYFTNM';

      var Http = new XMLHttpRequest();
      var url = "https://api.nft.storage/upload";
      Http.open("POST", url);
      Http.setRequestHeader('Authorization', 'Bearer ' + api_key);

      Http.send(this.state.selectedFile);

      Http.onreadystatechange = function (e) {
        console.log(Http.responseText);
        var json = JSON.parse(Http.responseText);
        _this2.setState({ ipfs_url: json.value.cid });
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.ipfs_url != '') {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'h4',
            { 'class': 'text-white text-center' },
            'IPFS CID: ',
            this.state.ipfs_url
          )
        );
      }

      return React.createElement(
        'div',
        null,
        React.createElement('input', { type: 'file', onChange: this.fileChangedHandler }),
        React.createElement(
          'button',
          { onClick: function onClick() {
              return _this3.uploadHandler();
            } },
          'Upload!'
        ),
        React.createElement('br', null),
        React.createElement('img', { id: 'upload-image', width: '200' })
      );
    }
  }]);

  return NFTUpload;
}(React.Component);

var domContainer = document.querySelector('#nft_upload_container');
ReactDOM.render(React.createElement(NFTUpload, null), domContainer);