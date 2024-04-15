import React, { useEffect, useState } from "react";

import DocumentUploader from "../../../components/application-7forms/document/Document";

import useJwt from "@src/dashboard/jwt/useJwt";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const documentfeild = [
  {
    document: null,
    document_type: "corporate_documents",
  },
  {
    document: null,
    document_type: "bank_statement",
  },
  {
    document: null,
    document_type: "creditcard_statement",
  },
  {
    document: null,
    document_type: "cancel_cheque",
  },
];

class OwnersDetail {
  constructor(fname, lname, doc_type, cop_id, document = null, uid = null) {
    this.name = `${fname} ${lname}`;
    this.document_type = doc_type;
    this.cop_id = cop_id;
    this.last_document = document;
    this.uid = uid;
  }
}

const Document = (props) => {
  const { id, stepper, cop_document } = props;
  const role = useSelector((state) => state.auth.userData.role);

  // ** State
  const [documentList, setDocumentList] = useState([...documentfeild]);
  const [isFetchedDocument, setIsFetchedDocument] = useState(false);
  const [loader, setLoader] = useState(false);

  // ** Get Dir and UBO Created Info
  function getCopDetails(doc = []) {
    return new Promise((resolve, reject) => {
      useJwt
        .cop_document({ application_id: id })
        .then((res) => {
          if (doc.length) resolve({ copList: res?.data, doc });
          else resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // ** Get File Uploaded
  function getFileUploaded() {
    return new Promise((resolve, reject) => {
      useJwt
        .getfileupload({ application_id: id })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // ** Handle Create Document
  function handleCreate(data) {
    return new Promise((resolve, rejected) => {
      useJwt
        .postfileupload(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejected(err);
        });
    });
  }

  // ** Handle Update Document
  function handleUpdate(data) {
    const uid = data.get("uid");
    return new Promise((resolve, rejected) => {
      useJwt
        .putfileupload(uid, data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejected(err);
        });
    });
  }

  // ** Handle Send Data to Server

  async function handleSend() {
    setLoader(true);
    const sendLists = [...documentList].reduce(
      (initialArray, docs) => {
        const form = new FormData();
        if (
          typeof docs.document == "object" &&
          docs.document &&
          docs.last_document
        ) {
          form.append("document", docs.document);
          form.append("uid", docs.uid);
          form.append("document_type", docs.document_type);
          form.append("application_id", id);
          if (docs.cop_id) form.append("cop_id", docs.cop_id);
          initialArray.sendToUpadte.push(form);
        } else if (typeof docs.document == "object" && docs.document) {
          form.append("document", docs.document);
          form.append("document_type", docs.document_type);
          form.append("application_id", id);
          if (docs.cop_id) form.append("cop_id", docs.cop_id);
          initialArray.sendToCreate.push(form);
        }
        return initialArray;
      },
      { sendToUpadte: [], sendToCreate: [] }
    );

    const { sendToCreate: data1, sendToUpadte: data2 } = sendLists;

    if (!data1.length && !data2.length) {
      stepper.next();
      setLoader(false)
      return;
    }
    try {
      const l1 = data1.length;
      const l2 = data2.length;

      if (l1 && l2) {
        const [res1, res2] = await Promise.all([
          Promise.all(data1.map(handleCreate)),
          Promise.all(data2.map(handleUpdate)),
        ]);

        await handleUploadeDocAndOwnersDoc(false);
        stepper.next();
        setLoader(false)
        // Handle the results for creation and update
        console.log("Creation results:", res1);
        console.log("Update results:", res2);
      } else if (l1) {
        const res1 = await Promise.all(data1.map(handleCreate));
        await handleUploadeDocAndOwnersDoc(false);
        stepper.next();
        setLoader(false)
        // Handle the results for creation
        console.log("Creation results:", res1);
      } else if (l2) {
        const res2 = await Promise.all(data2.map(handleUpdate));
        await handleUploadeDocAndOwnersDoc(false);
        stepper.next();
        setLoader(false)
        // Handle the results for update
        console.log("Update results:", res2);
      }
    } catch (err) {
      setLoader(false)
      // Handle any errors that occurred
      console.error(err);
    }
    setLoader(false)
  }

  async function handleUploadeDocAndOwnersDoc(skipOwner = false) {
    const dyn = ["utility_bill", "personal_id"];
    try {
      //** Cop Data List
      const copResponse = skipOwner ? await getCopDetails() : { data: [] };
      const copData = copResponse?.data ? copResponse?.data : [];

      // ** Uploaded Data List
      const uploadedResponse = await getFileUploaded();
      const uploadedData = uploadedResponse?.data ? uploadedResponse?.data : [];
      const uploadedDocHash = new Map();

      if (uploadedData.length) {
        uploadedData.forEach((doc) => {
          if (dyn.includes(doc.document_type)) {
            const { cop, uid, document, document_type } = doc;
            const { first_name, last_name, uid: cop_id } = cop;
            // console.log({ first_name, last_name, cop_id, cop, uid, document });
            uploadedDocHash.set(
              `${cop_id}${document_type}`,
              new OwnersDetail(
                first_name,
                last_name,
                document_type,
                cop_id,
                document,
                uid
              )
            );
          } else {
            const { document, uid, document_type } = doc;
            uploadedDocHash.set(document_type, {
              last_document: document,
              uid,
              document_type,
            });
          }
        });
      }

      // ** Static Document List;
      const docDefaultList = [...documentList];
      if (
        copData.length &&
        !uploadedData.length &&
        docDefaultList.length == 4
      ) {
        copData.forEach((detail) => {
          const { first_name, last_name, uid } = detail;

          const utility = new OwnersDetail(
            first_name,
            last_name,
            "utility_bill",
            uid
          );

          const personalId = new OwnersDetail(
            first_name,
            last_name,
            "personal_id",
            uid
          );

          docDefaultList.push(utility);
          docDefaultList.push(personalId);
        });
        setDocumentList([...docDefaultList]);
      } else if (
        !copData.length &&
        uploadedData.length &&
        docDefaultList.length
      ) {
        const updatedDocList = docDefaultList.map((currDoc) => {
          if (
            dyn.includes(currDoc.document_type) &&
            uploadedDocHash.has(`${currDoc?.cop_id}${currDoc?.document_type}`)
          ) {
            return uploadedDocHash.get(
              `${currDoc?.cop_id}${currDoc?.document_type}`
            );
          } else if (uploadedDocHash.has(currDoc.document_type)) {
            return uploadedDocHash.get(currDoc?.document_type);
          } else return currDoc;
        });
        setDocumentList([...updatedDocList]);
      } else if (
        copData.length &&
        uploadedData.length &&
        docDefaultList.length
      ) {
        const copHash = new Map();
        copData.forEach((cop) => {
          if (cop.uid) {
            copHash.set(
              `${cop.uid}${dyn[0]}`,
              JSON.stringify({
                first_name: cop.first_name,
                last_name: cop.last_name,
                cop_id: cop.uid,
              })
            );
            copHash.set(
              `${cop.uid}${dyn[1]}`,
              JSON.stringify({
                first_name: cop.first_name,
                last_name: cop.last_name,
                cop_id: cop.uid,
              })
            );
          }
        });
        const restoreDocList = docDefaultList.filter((ele) => {
          if (ele.cop_id && copHash.has(`${ele.cop_id}${ele.document_type}`)) {
            copHash.delete(`${ele.cop_id}${ele.document_type}`);
            return ele;
          } else return ele;
        });

        const remainingCop = Array.from(copHash.values());
        const updatedCop = [...new Set(remainingCop)];
        if (remainingCop.length) {
          updatedCop.forEach((cop) => {
            const { first_name, last_name, cop_id } = JSON.parse(cop);
            restoreDocList.push(
              new OwnersDetail(
                first_name,
                last_name,
                "utility_bill",
                cop_id,
                null
              )
            );
            restoreDocList.push(
              new OwnersDetail(
                first_name,
                last_name,
                "personal_id",
                cop_id,
                null
              )
            );
          });
        }

        const updateDocList = restoreDocList.map((ele) => {
          if (
            dyn.includes(ele.document_type) &&
            uploadedDocHash.has(`${ele.cop_id}${ele.document_type}`)
          ) {
            const data = uploadedDocHash.get(
              `${ele.cop_id}${ele.document_type}`
            );
            ele.last_document = data.document;
            ele.uid = data.uid;
            return { ...ele, uid: data.uid, last_document: data.last_document };
          } else if (uploadedDocHash.has(ele.document_type)) {
            const data = uploadedDocHash.get(ele.document_type);
            return data;
          } else {
            return ele;
          }
        });
        setDocumentList([...updateDocList]);
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (isFetchedDocument) {
      handleUploadeDocAndOwnersDoc(false);
      setIsFetchedDocument(false);
    } else {
      handleUploadeDocAndOwnersDoc(true);
    }
  }, [cop_document, isFetchedDocument]);

  // useEffect(() => {
  //   console.log(documentList);
  // }, [documentList]);

  return (
    <>
      <DocumentUploader
        documentList={documentList}
        stepper={stepper}
        setDocumentList={setDocumentList}
        handleData={handleSend}
        id={id}
        loader={loader}
      />
    </>
  );
};

export default Document;
