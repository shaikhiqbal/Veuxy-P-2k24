// ** React Imports
import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Table,
  Modal,
  Button,
  CardBody,
  ModalBody,
  ModalHeader,
  FormFeedback,
  UncontrolledTooltip,
} from "reactstrap";

// ** Third Party Components
import {
  AlertTriangle,
  Check,
  Copy,
  Eye,
  Info,
  Pocket,
  XSquare,
} from "react-feather";
import { useForm, Controller } from "react-hook-form";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Custom Components
import AvatarGroup from "@components/avatar-group";

// ** FAQ Illustrations
import illustration from "@src/assets/images/illustration/faq-illustrations.svg";
const dataType = {
  pending: "P,MQ",
  approved: "A",
  rejected: "R",
  uw: "AUW",
  incomplited: "INC",
};
// ** Vars
const cardList = [
  {
    title: "Application Incomplited",
    color: { bg: "#FFF4E9", color: "warning" },
    icon: <AlertTriangle className="text-warning" />,
    dataType: "pending",
  },
  {
    title: "Application Approved",
    color: { bg: "#e9f9ee", color: "success" },
    icon: <Check className="text-success" />,
    dataType: "approved",
  },
  {
    title: "Application By Underwriter",
    color: { bg: "#E8FAFD", color: "info" },
    icon: <Pocket className="text-info" />,
    dataType: "uw",
  },
  {
    title: "Application Rejected",
    color: { bg: "#FFF4E9", color: "danger" },
    icon: <XSquare className="text-danger" />,
    dataType: "rejected",
  },
  //   {
  //     totalUsers: 3,
  //     title: "Application Incomplited",
  //     color: { bg: "#FFF4E9", color: "danger" },
  //     icon: <XSquare className="text-danger" />,
  //     dataType: "incomplited",
  //   },
];

const ApplicationCard = ({ setTable, data,show=0 }) => {
  const [hoverCard, setHoverCard] = useState(null);
  const [activeCard, setActive] = useState(null);
  // ** Hooks
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { roleName: "" } });

  const handleEnter = (id) => {
    setHoverCard(id);
  };
  const handleLeave = () => {
    setHoverCard(null);
  };
  return (
    <Fragment>
      <Row>
        {cardList.map((item, index) => {
          return (
            <Col
              key={index}
              sm={3}
              style={{
                transition: "all 0.5s",
                cursor: "pointer",
                transform: `scale(${hoverCard == index ? 1.1 : show})`,
              }}
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={() => handleLeave()}
            >
              <Card className="curson-pointer text-center">
                <CardBody className="d-flex justify-content-center flex-column align-items-center">
                  <div
                    className="avatar-content"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: `${item.color.bg}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "5px",
                    }}
                  >
                    {item.icon}
                  </div>

                  <div className="d-flex justify-content-between align-items-end mt-1 pt-25">
                    <div className="role-heading">
                      <h4 className="fw-bolder">{item.title}</h4>
                      <h5 className="my-1">{`Total ${
                        data[item.totalUsers]
                          ? data[item.totalUsers]?.length
                          : 0
                      } Application`}</h5>
                      <Button.Ripple
                        outline
                        className="round btn-sm"
                        color="primary"
                        onClick={() => setTable(item.dataType)}
                      >
                        <Eye size={14} />
                        <span className="align-middle ms-25">See Table</span>
                      </Button.Ripple>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default ApplicationCard;
