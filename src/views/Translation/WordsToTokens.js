import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";
import {CopyToClipboard} from "react-copy-to-clipboard";

import Loading from 'components/Common/Loading'

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

const styles = {};

class WordsToTokens extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        englishWords: '',
        vietnameseWords: '',
        result: '',
      },
      isProcessing: false,
    }

    this.consoleLogData = this.consoleLogData.bind(this);
  }

  componentWillMount() {
    // this.consoleLogData();
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  /**
   * English Sample: curl 'https://translate.google.com/translate_tts?ie=UTF-8&q=Hello%20Everyone&tl=en&client=tw-ob' -H 'Referer: http://translate.google.com/' -H 'User-Agent: stagefright/1.2 (Linux;Android 5.0)' > google_tts.mp3
   *
   * Vietnamese Sample: curl 'https://translate.google.com/translate_tts?ie=UTF-8&q=nguy%C3%AAn%20thu%CC%89y&tl=vi&client=tw-ob' -H 'Referer: http://translate.google.com/' -H 'User-Agent: stagefright/1.2 (Linux;Android 5.0)' > google_tts.mp3
   * @param e
   */
  consoleLogData(englishs = [], vietnameses = []) {
    if(englishs.length === 0 || (englishs.length !== vietnameses.length)) {
      alert('Please provide data correctly');
      return false;
    }

    const len = englishs.length;
    const lenPad = `${len}`.length;
    let result = '';
    for(let idx = 0; idx < len; idx ++) {
      const wordEnglish = encodeURIComponent(englishs[idx]);
      const wordVietnamese = encodeURIComponent(vietnameses[idx]);
      const pad = this.pad(idx, lenPad);
      const chars = [...englishs[idx]];
      const englishByChar = encodeURIComponent(chars.join(' '));
      const speed = '&ttsspeed=0.24';

      result += `curl 'https://translate.google.com/translate_tts?ie=UTF-8&q=${wordEnglish}&tl=en&client=tw-ob' -H 'Referer: http://translate.google.com/' -H 'User-Agent: stagefright/1.2 (Linux;Android 5.0)' > word_${pad}_000_1.mp3\r\n`;
      result += `cp nhactrang.mp3 word_${pad}_000_2.mp3\r\n`;
      result += `cp nhactrang.mp3 word_${pad}_000_3.mp3\r\n`;

      result += `curl 'https://translate.google.com/translate_tts?ie=UTF-8&q=${wordVietnamese}&tl=vi&client=tw-ob' -H 'Referer: http://translate.google.com/' -H 'User-Agent: stagefright/1.2 (Linux;Android 5.0)' > word_${pad}_001_1.mp3\r\n`;
      result += `cp nhactrang.mp3 word_${pad}_001_2.mp3\r\n`;
      result += `cp nhactrang.mp3 word_${pad}_001_3.mp3\r\n`;

      result += `curl 'https://translate.google.com/translate_tts?ie=UTF-8&q=${wordEnglish}&tl=en&client=tw-ob${speed}' -H 'Referer: http://translate.google.com/' -H 'User-Agent: stagefright/1.2 (Linux;Android 5.0)' > word_${pad}_002_1.mp3\r\n`;
      result += `cp nhactrang.mp3 word_${pad}_002_2.mp3\r\n`;
      result += `cp nhactrang.mp3 word_${pad}_002_3.mp3\r\n`;

      result += `curl 'https://translate.google.com/translate_tts?ie=UTF-8&q=${englishByChar}&tl=en&client=tw-ob' -H 'Referer: http://translate.google.com/' -H 'User-Agent: stagefright/1.2 (Linux;Android 5.0)' > word_${pad}_003_1.mp3\r\n`;
      result += `cp nhactrang.mp3 word_${pad}_003_2.mp3\r\n`;
      result += `cp nhactrang.mp3 word_${pad}_003_3.mp3\r\n`;
      result += `cp nhactrang.mp3 word_${pad}_003_4.mp3\r\n`;

      result += `cp word_${pad}_001_1.mp3 word_${pad}_004_1.mp3\r\n`;
      result += `cp nhactrang.mp3 word_${pad}_004_2.mp3\r\n`;
      result += `cp nhactrang.mp3 word_${pad}_004_3.mp3\r\n`;

      // break;
      // console.log(`curl 'https://translate.google.com/translate_tts?ie=UTF-8&q=${wordEnglish}&tl=en&client=tw-ob' -H 'Referer: http://translate.google.com/' -H 'User-Agent: stagefright/1.2 (Linux;Android 5.0)' > word_${this.pad(idx, lenPad)}_en.mp3`);
      // console.log(`curl 'https://translate.google.com/translate_tts?ie=UTF-8&q=${wordVietnamese}&tl=vi&client=tw-ob' -H 'Referer: http://translate.google.com/' -H 'User-Agent: stagefright/1.2 (Linux;Android 5.0)' > word_${this.pad(idx, lenPad)}_vi.mp3`);
    }

    this.setState((prevState) => {
      return ({
        form: {
          ...prevState.form,
          result: result
        }
      });
    })
  }

  handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState((prevState) => {
      return ({
        form: {
          ...prevState.form,
          [id]: value
        }
      });
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { form: {englishWords, vietnameseWords} } = this.state;
    const englishs = englishWords.split('--');
    const vietnameses = vietnameseWords.split('--');
    this.consoleLogData(englishs, vietnameses);

    // const wordsArray = words.split(',');
    // console.log(wordsArray)
    //
    // const instance = axios.create({
    //   baseURL: process.env.REACT_APP_LOCAL_SERVER,
    // });
    // instance.post('words2tokens', {
    //   words:  words
    // }).then(res => {
    //   console.log('res', res)
    // }).catch(err => {
    //   console.log('err', err)
    // });
  }

  render() {
    const { classes } = this.props;
    const { isProcessing, form: {result} } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Words 2 Tokens</h4>
                </CardHeader>

                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="English Words"
                        id="englishWords"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          multiline: true,
                          onChange: this.handleChange,
                          rows: 10
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Vietnamese Words"
                        id="vietnameseWords"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          multiline: true,
                          onChange: this.handleChange,
                          rows: 10
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Result"
                        id="result"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          multiline: true,
                          onChange: this.handleChange,
                          rows: 10,
                          value: this.state.form.result,
                          disabled: true,
                        }}
                      />
                    </GridItem>

                    {isProcessing && <GridItem xs={12} sm={12} md={12}>
                      <Loading />
                    </GridItem>}

                  </GridContainer>
                </CardBody>

                <CardFooter>
                  <Button type="submit" color="primary" disabled={isProcessing ? true : false}>Convert</Button>
                  <CopyToClipboard text={result}>
                    <Button type="button" color="info">Copy</Button>
                  </CopyToClipboard>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

WordsToTokens.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(WordsToTokens);
