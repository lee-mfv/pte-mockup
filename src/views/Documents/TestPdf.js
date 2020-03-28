import React, {Component} from 'react'

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  pdfViewer: {
    width: '100%',
    // height: '100%',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
  }
};

class TestPdf extends Component {
  constructor(props) {
    super(props);

    this.viewer = React.createRef();
    this.docViewer = null;
    this.annotManager = null;
    this.instance = null;
  }

  componentDidMount() {
    window.WebViewer({
      path: '/lib',
      initialDoc: '/files/webviewer-demo-annotated.pdf'
    }, this.viewer.current).then(instance => {
      // at this point, the viewer is 'ready'
      // call methods from instance, docViewer and annotManager as needed
      this.instance = instance;
      this.docViewer = instance.docViewer;
      this.annotManager = instance.annotManager;

      // you can also access major namespaces from the instance as follows:
      // var Tools = instance.Tools;
      // var Annotations = instance.Annotations;

      // now you can access APIs through `this.instance`
      this.instance.openElement('notesPanel')

      // or listen to events from the viewer element
      this.viewer.current.addEventListener('pageChanged', (e) => {
        const [ pageNumber ] = e.detail;
        console.log(`Current page is ${pageNumber}`);
      });

      // or from the docViewer instance
      this.docViewer.on('annotationsLoaded', () => {
        console.log('annotations loaded');
      });

      // this.docViewer.on('documentLoaded', this.wvDocumentLoadedHandler)
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create Blog</h4>
            </CardHeader>

            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {/*<div className={classes.pdfViewer}>*/}
                  <div className={classes.pdfViewer} ref={this.viewer}></div>
                  {/*</div>*/}
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    )
  }
}

export default withStyles(styles)(TestPdf);
