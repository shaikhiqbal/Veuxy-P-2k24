import { lazy } from "react";

// ** Dashboard - 2 Pages
const Dashboard = lazy(() =>
  import("../../views/pages/merchant-dashboard-2/dashboard/dashboard")
);

const Users = lazy(() =>
  import("../../views/pages/merchant-dashboard-2/user-management/User")
);

const AddUsersForm = lazy(() =>
  import("../../views/pages/merchant-dashboard-2/user-management/AddUser")
);

const UserMangement = lazy(() =>
  import(
    "../../views/pages/merchant-dashboard-2/user-management/UserManagement"
  )
);

const UserRoles = lazy(() =>
  import("../../views/pages/merchant-dashboard-2/user-management/UserRole")
);

const AddUserRole = lazy(() =>
  import("../../views/pages/merchant-dashboard-2/user-management/AddUserRole")
);

const CategorySales = lazy(() =>
  import("../../views/pages/merchant-dashboard-2/sales/CategorySales")
);

const ItemsSales = lazy(() =>
  import("../../views/pages/merchant-dashboard-2/sales/ItemsSales")
);

const PaymentMethod = lazy(() =>
  import("../../views/pages/merchant-dashboard-2/sales/PaymentMethod")
);

const SalesSummary = lazy(() =>
  import("../../views/pages/merchant-dashboard-2/sales/SalesSummary")
);

const Taxes = lazy(() =>
  import("../../views/pages/merchant-dashboard-2/sales/Taxes")
);

const TransactionStatus = lazy(() =>
  import("../../views/pages/merchant-dashboard-2/sales/TransactionStatus")
);

const SalesTrends = lazy(() =>
  import("../../views/pages/merchant-dashboard-2/sales/SalesTrends")
);

const InventryManagement = lazy(() =>
  import(
    "../../views/pages/merchant-dashboard-2/inventory-management/InventryManagement"
  )
);

const VirtualTerminal = lazy(() =>
  import(
    "../../views/pages/merchant-dashboard-2/virtual-terminal/VirtualTerminal"
  )
);

const AddProduct = lazy(() =>
  import(
    "../../views/components/merchant-dashboard-2/inventry-management/AddProducts"
  )
);

const InvoiceSettings = lazy(() =>
  import(
    "../../views/pages/merchant-dashboard-2/invoice-management/InvoiceSettings"
  )
);

const RecurringInvoice = lazy(() =>
  import(
    "../../views/pages/merchant-dashboard-2/invoice-management/RecurringInvoice"
  )
);

const CreateInvoice = lazy(() =>
  import(
    "../../views/pages/merchant-dashboard-2/invoice-management/CreateInvoice"
  )
);

const CustomerManagment = lazy(() =>
  import(
    "../../views/pages/merchant-dashboard-2/pos/customer-management/CustomerManagment"
  )
);

const PointOfSale = lazy(() =>
  import("../../views/pages/merchant-dashboard-2/pos/point-of-sale/PointOfSale")
);

const ProductManagement = lazy(() =>
  import(
    "../../views/pages/merchant-dashboard-2/pos/product-management/ProductManagement"
  )
);

// ** Declaration

const ApprovedMerchantRoutes = [
  {
    path: "/merchant/payment-gateway",
    element: <Dashboard />,
  },

  {
    path: "/merchant/users",
    element: <Users />,
  },

  {
    path: "/add-user",
    element: <AddUsersForm />,
  },

  {
    path: "/add-user-role",
    element: <AddUserRole />,
  },

  {
    path: "/merchant/user-role",
    element: <UserRoles />,
  },

  {
    path: "/user-management-setting",
    element: <UserMangement />,
  },

  {
    path: "/merchant/category-sales",
    element: <CategorySales />,
  },

  {
    path: "/merchant/items-sales",
    element: <ItemsSales />,
  },

  {
    path: "/merchant/payment-method",
    element: <PaymentMethod />,
  },

  {
    path: "/merchant/sales-summary",
    element: <SalesSummary />,
  },

  {
    path: "/merchant/taxes",
    element: <Taxes />,
  },

  {
    path: "/merchant/transaction-status",
    element: <TransactionStatus />,
  },

  {
    path: "/merchant/sales-trends",
    element: <SalesTrends />,
  },

  {
    path: "/merchant/inventry-management",
    element: <InventryManagement />,
  },

  {
    path: "/merchant/virtual-terminal",
    element: <VirtualTerminal />,
  },

  {
    path: "/merchant/add-product",
    element: <AddProduct />,
  },

  {
    path: "/merchant/invoice-setting",
    element: <InvoiceSettings />,
  },

  {
    path: "/merchant/recurring-invoice",
    element: <RecurringInvoice />,
  },

  {
    path: "/merchant/create-invoice",
    element: <CreateInvoice />,
  },

  {
    path: "/merchant/customer-list",
    element: <CustomerManagment />,
  },

  {
    path: "/merchant/point-of-sale",
    element: <PointOfSale />,
  },

  {
    path: "/merchant/product-managment",
    element: <ProductManagement />,
  },
];

export default ApprovedMerchantRoutes;
