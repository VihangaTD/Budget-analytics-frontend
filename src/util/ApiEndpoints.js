export const BASE_URL = "http://localhost:8080/api/v1.0"

const CLOUDINARY_CLOUD_NAME = "dolovnhv1";

export const API_ENDPOINTS={
    LOGIN : "/login",
    REGISTER : "/register",
    GET_USER_INFO:"/profile",
    ADD_CATEGORY:"/categories",
    UPDATE_CATEGORY:(categoryId)=>`/categories/${categoryId}`,
    GET_ALL_CATEGORIES:"/categories",
    GET_ALL_INCOMES:"/incomes",
    CATEGORY_BY_TYPE:(type)=>`/categories/${type}`,
    ADD_INCOME:"/incomes",
    DELETE_INCOME:(incomeId)=>`/incomes/${incomeId}`,
    GET_ALL_EXPENSES:"/expenses",
    ADD_EXPENSE:"/expenses",
    DELETE_EXPENSE:(expenseId)=>`/expenses/${expenseId}`,
    INCOME_EXCEL_DOWNLOAD:"/excel/download/income",
    EMAIL_INCOME:"/email/income-excel",
    APPLY_FILTERS:"/filter",

    UPLOAD_IMAGE : `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}