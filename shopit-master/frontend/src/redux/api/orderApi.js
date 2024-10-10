import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// builder.query -> for fetch data, 
// builder.mutation -> for post, put, delete

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    tagTypes: ['Order', 'AdminOrders'],
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({
        
        createNewOrder: builder.mutation({
            query(body) {
                return {
                    url: '/orders/new',
                    method: 'POST',
                    body
                }
            },
        }),

        myOrders: builder.query({
            query: () => `/me/orders`,
        }),

        orderDeatails: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: ['Order']
        }),

        stripeCheckoutSession: builder.mutation({
            query(body) {
                return {
                    url: '/payment/checkout_session',
                    method: 'POST',
                    body
                }
            },
        }),

        getDashboardSales: builder.query({
            query: ({startDate, endDate}) => `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
        }),

        getAdminOrders: builder.query({
            query: () => `/admin/orders`,
            providesTags: ['AdminOrders']
        }),

        updateOrder: builder.mutation({
            query({ id, body }) {
                return {
                    url: `/admin/orders/${id}`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['Order']
        }),

        deleteOrder: builder.mutation({
            query(id) {
                return {
                    url: `/admin/orders/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['AdminOrders']
        }),

    })
});
export const { 
    useCreateNewOrderMutation, 
    useStripeCheckoutSessionMutation, 
    useMyOrdersQuery,
    useOrderDeatailsQuery,
    useLazyGetDashboardSalesQuery,
    useGetAdminOrdersQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation
 } = orderApi;