import React, {useState, useEffect} from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import Hidden from "@material-ui/core/Hidden";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({filePath, startPage = 1, endPage}) => {
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(startPage ? startPage : 1);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function onNext() {
    const endPageTmp = endPage ? endPage : numPages;
    const pageNumberTmp = pageNumber < endPageTmp ? pageNumber + 1 : pageNumber;
    setPageNumber(pageNumberTmp);
  }

  function onPrevious() {
    const startPageTmp = startPage ? startPage : 1;
    const pageNumberTmp = pageNumber > startPageTmp ? pageNumber - 1 : pageNumber;
    setPageNumber(pageNumberTmp);
  }

  function zoom(diff) {
    setScale(scale + diff);
  }

  useEffect(() => {
    if(numPages) {
      const pageNumberTmp = startPage ? startPage : 1;
      setPageNumber(pageNumberTmp);
      setScale(1);
    }
  }, [numPages, startPage]);

  useEffect(() => {
    setNumPages(null);
    setPageNumber(1);
  }, [filePath]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} container justify="center">
                <Hidden smDown implementation="css">
                  <Button type="button" color="info" onClick={() => zoom(-0.1)}>Zoom Out <ZoomOutIcon /></Button>
                  <Button type="button" color="info" onClick={() => zoom(0.1)}>Zoom In <ZoomInIcon /></Button>
                </Hidden>
                <Hidden mdUp implementation="css">
                  <Button type="button" color="info" justIcon round size="sm" onClick={() => zoom(-0.1)}><ZoomOutIcon /></Button>
                  <Button type="button" color="info" justIcon round size="sm" onClick={() => zoom(0.1)}><ZoomInIcon /></Button>
                </Hidden>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Document
                  file={filePath}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} scale={scale} />
                </Document>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} container justify="center">
                <p>Page {pageNumber} of {endPage ? endPage : numPages}</p>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} container justify="center">
                <Button type="submit" color="success" onClick={onPrevious}>Previous</Button>
                <Button type="submit" color="primary" onClick={onNext}>Next</Button>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

export default PdfViewer;