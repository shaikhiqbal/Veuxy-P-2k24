import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FileText,
  X,
  DownloadCloud,
  File,
  FileImage,
  Eye,
} from "react-feather";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
  Collapse,
  Row,
  Col,
  ListGroup,
  Button,
  Alert,
  List,
  Badge,
  Tooltip,
} from "reactstrap";

const FileUploaderMultiple = (props) => {
  const { element, list, setList, index } = props;
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const dynamicValue = () => {};

  const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const validFiles = acceptedFiles.filter((file) => {
        const fileType = file.type.toLowerCase();

        if (!allowedFileTypes.includes(fileType)) setError(true);
        else setError(false);
        return allowedFileTypes.includes(fileType);
      });
      if (validFiles.length) {
        const tempList = [...list];
        const fileData = [...validFiles.map((file) => Object.assign(file))];
        tempList[index].document = fileData[0];
        setList([...tempList]);
        setFiles([...fileData]);
      }
    },
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="28"
          width="28"
        />
      );
    } else if (file.type === "application/pdf") {
      return <File size="28" />;
    } else {
      return <FileText size="28" />;
    }
  };

  const handleRemoveFile = (file, index) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const fileList = files.map((file, index) => (
    <div
      key={`${file.name}-${index}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0">{file.name}</p>
          <p className="file-size mb-0">{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveFile(file, index)}
      >
        <X size={14} />
      </Button>
    </div>
  ));

  const documentLabel = {
    corporate_documents: "Corporate Documents",
    bank_statement: "Bank Statement",
    creditcard_statement: "Creditcard Statement",
    cancel_cheque: "Cancel Cheque",
    utility_bill: "Utility Bill",
    personal_id: "Personal Id",
  };

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  return (
    <Card>
      <CardHeader className="border-bottom mb-1 d-flex">
        <CardTitle tag="h4">
          {documentLabel[element.document_type]}{" "}
          {element.name && (
            <>
              : <span className="text-info fw-bolder">{element.name}</span>
            </>
          )}
        </CardTitle>
        <div className="d-flex align-items-baseline g-1">
          {element.last_document && (
            <>
              <span>
                <Badge color="success" pill>
                  Previous Uploaded File
                </Badge>
              </span>
              <a id="see-file" className="ms-1" href={element.last_document}>
                <Button.Ripple
                  className="btn-icon rounded-circle"
                  color="flat-success"
                >
                  <Eye size={16} />
                </Button.Ripple>
              </a>
              <Tooltip
                isOpen={tooltipOpen}
                target="see-file"
                toggle={toggleTooltip}
              >
                See File!
              </Tooltip>
            </>
          )}
        </div>

        <Collapse isOpen={error} className="w-100">
          <Alert color="danger" className="p-2">
            <p>
              Please select and upload only files with the following formats:
              PDF, JPG, and PNG.
            </p>
            <p>Accepted file types:</p>
            <List>
              <li>PDF (.pdf)</li>
              <li>JPG (.jpg or .jpeg)</li>
              <li>PNG (.png)</li>
            </List>
          </Alert>
        </Collapse>
      </CardHeader>
      <CardBody>
        <Row className="d-flex justify-content-center">
          {!files[0] ? (
            <Col sm="12" md="7" lg="7" xl="7">
              <div {...getRootProps({ className: "dropzone" })} className="">
                <input {...getInputProps()} />
                <div className="d-flex align-items-center justify-content-center flex-column">
                  <DownloadCloud size={64} />
                  <p>Drop Files here or click to upload</p>
                  <small className="text-secondary">
                    Drop files here or click{" "}
                    <a href="/" onClick={(e) => e.preventDefault()}>
                      browse
                    </a>{" "}
                    thorough your machine
                  </small>
                </div>
              </div>
            </Col>
          ) : (
            <Col sm="12" md="7" lg="7" xl="7" className="rounded border p-1">
              {files.length ? (
                <ListGroup className="my-2">{fileList}</ListGroup>
              ) : null}
            </Col>
          )}
        </Row>
      </CardBody>
      <CardFooter>
        <CardText className={``}>
          Accept only <span className="text-warning">pdf, jpg, and png</span>{" "}
          file types.
        </CardText>
      </CardFooter>
    </Card>
  );
};

export default FileUploaderMultiple;
