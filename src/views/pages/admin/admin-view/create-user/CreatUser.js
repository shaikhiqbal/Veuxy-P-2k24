// ** React Imports
import { Fragment, useState, React, useEffect } from 'react'

// ** Table Data & Columns
// import { data } from '../data'

// ** Add New Modal Component
import AddUserForm from './AddUserForm'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit, Trash2,Plus } from 'react-feather'
import { Tooltip } from 'reactstrap'

//** Api
import useJwt from "@src/dashboard/jwt/useJwt";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader,

} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// // ** Bootstrap Checkbox Component
// const BootstrapCheckbox = forwardRef((props, ref) => (
//   <div className='form-check'>
//     <Input type='checkbox' ref={ref} {...props} />
//   </div>
// ))


const userTypes=
[
"admin",
 "FRT",
 "ISO",
 "Under Writer",
 "Merchant",
]

const DataTableWithButtons = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState(0)
  const [tooltipOpenTrash ,setTooltipOpenTrash]=useState(false)
  const [tooltipOpenEdit ,setTooltipOpenEdit]=useState(false)


  //** Store Data
  const [data,setData]=useState([])
  const [editData,setEditData]=useState({})
  const [block,setBlock]=useState(false)


//** Unblock User Hit
const unBlock=(uid)=>{
  useJwt.unBlockUser(uid).then(res=>{
if(res?.status===200){
  setBlock(!block)
}
  }).catch(err=>{
    alert(err?.response?.data?.detail)
  })
}

//** Block User Hit
const blockUser=(uid)=>{
  useJwt.blockUserData(uid).then(res=>{
    if(res.status==204){
    setBlock(!block)
    }
}).catch(err=>{
alert(err?.response?.data?.detail)
})
}




//** Columns
const columns = [

  {
    name: 'Full Name',
    sortable: true,
    minWidth: '10rem',
    selector: row => row.full_name

  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '20rem',
    selector: row => row.email
  },
  {
    name: 'Mobile',
    sortable: true,
    minWidth: '10rem',
    selector: row => row.mobile
  },
  {
    name: 'User Type',
    sortable: true,
    minWidth: '150px',
    selector: row => userTypes[row.user_type -1]
  },

  {
    name: 'Block',
    sortable: true,
    minWidth: '150px',
    cell:(row) =>{
      return(
        <div className="form-switch form-check-primary">
        <Input
          type="switch"
          name="icon-primary"
          onClick={()=>{
           if(row?.is_block){
            unBlock(row?.uid)
           }else{
            blockUser(row?.uid)
           }
          }}
          checked={row.is_block}
        />
      </div>
      )
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    minWidth: '10px',
    cell: (row) => {


      return (
        <div className='d-flex justify-content-between'>
         <Trash2 id={'trash'} onClick={()=>{
            //** todo
            if(!row.uid)return;
            useJwt.deleteUserData(row.uid).then(res=>{
                if(res.status===204){
                  
                }
            }).catch(err=>{
              console.log(err?.response);
            })
          }} style={{margin:'5px'}}  size={15}/>
      <Tooltip
        placement='top'
        isOpen={tooltipOpenTrash}
        target={'trash'}
        toggle={() => setTooltipOpenTrash(!tooltipOpenTrash)}
      >
        delete
      </Tooltip>



          <Edit onClick={()=>{
            if(!row.uid)return
            let index =data && data.findIndex(i =>i.uid === row.uid);
            
            if(index >=0 ){
              setEditData(data[index])
              setModal(!modal)
              }
            else setEditData({})
            
            
          }}
          style={{margin:'5px'}} size={15} />
        </div>
      )
    }
  }
]





  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    const status = {
      1: { title: 'Current', color: 'light-primary' },
      2: { title: 'Professional', color: 'light-success' },
      3: { title: 'Rejected', color: 'light-danger' },
      4: { title: 'Resigned', color: 'light-warning' },
      5: { title: 'Applied', color: 'light-info' }
    }

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(data.length / 7) || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />
  )

const getTableData= async()=>{
  await useJwt.getalltypeuser().then(res=>{
    setData(res.data)
    }).catch(err=>{
      console.log(err.response);
   })
}

useEffect(()=>{
getTableData()
 },[modal,block])
  return (
    <Fragment>
      <Card>
        {/* <button className='w-25' onClick={()=>setData(x=>x+1)}>Call Data</button> */}
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Users Table</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
        
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Add User</span>
            </Button>
          </div>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='me-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              disabled
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className='react-dataTable'>
          <DataTable
            fixedHeader
            pagination
            highlightOnHover
            columns={columns}
            fixedHeaderScrollHeight={"400rem"}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={searchValue.length ? filteredData : data}
          />
        </div>
      </Card>
      <AddUserForm open={modal} setOpen={setModal} userData={editData} />
    </Fragment>
  )
}

export default DataTableWithButtons
