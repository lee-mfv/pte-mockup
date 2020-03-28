import React, {useState, useEffect} from 'react'
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

const styles = theme => ({
  pdfViewer: {
    width: '100%',
    height: '500px',
    [theme.breakpoints.up("sm")]: {
      height: '750px'
    },
    display: 'flex',
    flexDirection: 'column',
  },
  btnNext: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
  },
  btnPrevious: {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
  },
});

const PdfViewerPdftron = (props) => {
  const {classes, filePath, startPage, endPage} = props;
  const [viewer] = useState(React.createRef());
  const [docViewer, setDocViewer] = useState(null);
  // const [annotManager, setAnnotManager] = useState(null);
  const [instanceTmp, setInstanceTmp] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(startPage ? startPage : 1);

  useEffect(() => {
    window.WebViewer({
      path: '/lib',
      initialDoc: filePath,
      enableAnnotations: false,
    }, viewer.current).then(instance => {
      // at this point, the viewer is 'ready'
      // call methods from instance, docViewer and annotManager as needed
      setInstanceTmp(instance);
      setDocViewer(instance.docViewer);
      // setAnnotManager(instance.annotManager);

      // you can also access major namespaces from the instance as follows:
      // var Tools = instance.Tools;
      // var Annotations = instance.Annotations;
    })
  }, [viewer, filePath]);

  useEffect(() => {
    if(instanceTmp && docViewer) {
      const initData = () => {
        instanceTmp.setCurrentPageNumber(pageNumber);
        setNumPages(instanceTmp.getPageCount());
      }

      // now you can access APIs through `instanceTmp`
      instanceTmp.openElement('notesPanel')

      // or listen to events from the viewer element
      viewer.current.addEventListener('pageChanged', (e) => {
        const [ pageNumber ] = e.detail;
        // console.log(`Current page is ${pageNumber}`);
        setPageNumber(pageNumber);
      });

      // // or from the docViewer instance
      // docViewer.on('annotationsLoaded', () => {
      //   console.log('annotations loaded');
      // });

      docViewer.on('documentLoaded', initData)
    }
  }, [instanceTmp, docViewer, viewer, pageNumber]);

  function next() {
    const endPageTmp = endPage ? endPage : numPages;
    // const currentPageNumber = instanceTmp.getCurrentPageNumber();
    const pageNumberTmp = pageNumber < endPageTmp ? pageNumber + 1 : pageNumber;

    setPageNumber(pageNumberTmp);
    instanceTmp.setCurrentPageNumber(pageNumberTmp);
  }


  function previous() {
    const startPageTmp = startPage ? startPage : 1;
    const pageNumberTmp = pageNumber > startPageTmp ? pageNumber - 1 : pageNumber;

    setPageNumber(pageNumberTmp);
    instanceTmp.setCurrentPageNumber(pageNumberTmp);
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.pdfViewer} ref={viewer}></div>
          </GridItem>
        </GridContainer>
      </GridItem>

      <Button type="button" color="primary" className={classes.btnPrevious} onClick={previous}>Previous</Button>
      <Button type="button" color="primary" className={classes.btnNext} onClick={next}>Next</Button>

    </GridContainer>
  )
}

export default withStyles(styles)(PdfViewerPdftron);