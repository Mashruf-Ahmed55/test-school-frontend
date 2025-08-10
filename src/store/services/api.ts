'use client';

import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

type AxiosBaseQueryParams = {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
};
type LoginResponse = {
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    isEmailVerified: boolean;
    certificationLevel?: string;
    lastAssessmentDate?: string | null;
    assessmentAttempts?: number;
  };
  message: string;
  success: boolean;
  accessToken: string;
};
interface IQuestion {
  _id?: string;
  competency: string;
  level: string;
  questionText: string;
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3;
  explanation: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
interface StartExamResponse {
  assessmentId: string;
  step: number;
  level: string;
  questions: IQuestion[];
  timeLimit: number;
}
const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryParams, unknown, unknown> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: url,
        method,
        data,
        params,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError<any>;
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || { message: err.message },
        },
      };
    }
  };

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    register: build.mutation<
      { ok: boolean },
      { email: string; password: string; name: string }
    >({
      query: (body) => ({
        url: '/api/v1/users/sign-up',
        method: 'POST',
        data: body,
      }),
    }),
    sendOtp: build.mutation<{ ok: boolean }, { email: string }>({
      query: (body) => ({
        url: '/api/v1/users/resend-otp',
        method: 'POST',
        data: body,
      }),
    }),
    verifyOtp: build.mutation<{ ok: boolean }, { email: string; otp: string }>({
      query: (body) => ({
        url: '/api/v1/users/verify-email',
        method: 'POST',
        data: body,
      }),
    }),
    login: build.mutation<LoginResponse, { email: string; password: string }>({
      query: (body) => ({
        url: '/api/v1/users/sign-in',
        method: 'POST',
        data: body,
      }),
    }),
    refresh: build.mutation<{ accessToken: string }, void>({
      query: () => ({ url: '/api/auth/refresh', method: 'POST' }),
    }),
    startExam: build.mutation<
      StartExamResponse,
      { step: 1 | 2 | 3; perQuestionSeconds?: number }
    >({
      query: (body) => ({
        url: '/api/v1/assessments/start-assessment',
        method: 'POST',
        data: body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    submitExam: build.mutation<
      { level: string; score: number; nextAllowed: boolean },
      any
    >({
      query: (body) => ({
        url: '/api/v1/assessments/submit-assessment',
        method: 'POST',
        data: body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    listUsers: build.query<
      { items: any[]; total: number },
      { page: number; pageSize: number }
    >({
      query: (p) => ({
        url: '/api/v1/admin/get-all-users',
        method: 'GET',
        params: p,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    listQuestions: build.query<
      { items: any[]; total: number },
      { levels?: string[]; page?: number; pageSize?: number }
    >({
      query: (p) => ({
        url: '/api/v1/questions/questions',
        method: 'GET',
        params: p,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      transformResponse: (response: any) => ({
        items: response.items,
        total: response.total,
      }),
    }),
    resetPassword: build.mutation<
      { ok: boolean },
      { email: string; otp: string; password: string }
    >({
      query: (body) => ({ url: '/api/auth/reset', method: 'POST', data: body }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useRefreshMutation,
  useStartExamMutation,
  useSubmitExamMutation,
  useListUsersQuery,
  useListQuestionsQuery,
  useResetPasswordMutation,
} = api;
