import React, { useEffect, useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Icons Imports
import * as Icon from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Spinner,
  Progress,
  CardFooter,
  Button,
} from "reactstrap";

const CardTransactions = ({ getData, openDocument }) => {
  
  const [percent, setPercent] = useState(0);
  const [isGet, setIsGet] = useState([]);
  const pr = [23, 20, 14, 15, 20, 8, 8];
  const transactionsArr = [
    {
      title: "Company Profile",
      color: "light-primary",
      subtitle: "fetching...",
      Icon: Icon["Check"],
      spiner: <Spinner color="danger" />,
    },
    {
      title: "Company Ownership",
      color: "light-success",
      subtitle: "fetching...",
      amount: "+ $480",
      Icon: Icon["Check"],
      spiner: <Spinner color="danger" />,
    },
    {
      title: "Business Profile",
      color: "light-danger",
      subtitle: "fetching...",
      amount: "+ $590",
      Icon: Icon["Check"],
      spiner: <Spinner color="danger" />,
    },
    {
      title: "Settlement Bank",
      color: "light-warning",
      subtitle: "fetching...",
      amount: "- $12",
      Icon: Icon["Check"],
      spiner: <Spinner color="danger" />,
      down: true,
    },
    {
      title: "Security Measure",
      color: "light-info",
      subtitle: "fetching...",
      amount: "+ $98",
      Icon: Icon["Check"],
      spiner: <Spinner color="danger" />,
    },
    {
      title: "Contact",
      color: "light-info",
      subtitle: "fetching...",
      amount: "+ $98",
      Icon: Icon["Check"],
      spiner: <Spinner color="danger" />,
    },
  ];

  const startProgres = () => {
    let counter = 0;
    let i = 0;
    const interval = setInterval(() => {
      setPercent(counter);
      isGet.push(i);
      counter += pr[i];
      i++;
      if (i == pr.length) {
        clearInterval(interval);
      }
    }, 1000);
  };

  useEffect(() => {
    if (percent !== 100) return;
      let flag = true;
      console.log({flag})
      openDocument(flag);
  }, [percent]);

  const renderTransactions = () => {
    return transactionsArr.map((item, id) => {
      return (
        <div key={item.title} className="transaction-item">
          <div className="d-flex">
            <Avatar className="rounded" color={"light-info"} icon={id + 1} />
            <div>
              <h6 className="transaction-title">{item.title}</h6>
              <small>
                {isGet.includes(id) ? (
                  <span className="text-success">fetched</span>
                ) : (
                  <span className="text-danger">fetching...</span>
                )}
              </small>
            </div>
          </div>
          <div
            className={`fw-bolder bg s${
              item.down ? "text-danger" : "text-success"
            }`}
            style={{ width: "50px", height: "50px", position: "relative" }}
          >
            <div
              className="position-absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                opacity: `${isGet.includes(id) ? "0" : "1"}`,
                transition: "all 0.5s",
              }}
            >
              {item.spiner}
            </div>
            <div
              className="position-absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                opacity: `${isGet.includes(id) ? "1" : "0"}`,
                transition: "all 0.5s",
              }}
            >
              <Avatar
                className="rounded"
                color={"light-success"}
                icon={<item.Icon size={15} />}
              />
            </div>
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    if (getData) {
      startProgres();
    }
    console.log(isGet);
  }, [getData]);
  return (
    <Card className="card-transaction">
      <CardHeader>
        <CardTitle tag="h4" className="text-center">
          Fecthing PDF Data
        </CardTitle>
      </CardHeader>
      <CardBody>
        {renderTransactions()}
        <Progress striped value={percent}>
          {percent}%
        </Progress>
      </CardBody>
    </Card>
  );
};

export default CardTransactions;
