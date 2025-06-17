// import { ResponseSuccessType, IGenericErrorResponse } from "@/types/common";
// import { baseUrl } from "./api";
import { GetServerSidePropsContext } from 'next';
import { IncomingMessage } from 'http';
import { baseUrl } from '../api';

// Function to get the token from cookies
const getTokenFromServerContext = (req: IncomingMessage): string | undefined => {
  const cookies = req.headers.cookie?.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: string }) || {};

  return cookies['auth-token']; // Adjust 'auth-token' to match your actual cookie name
};

const serverFetch = async (
  url: string,
  method: string,
  context: GetServerSidePropsContext,
  body?: any
): Promise<any> => {
  try {
    const token = getTokenFromServerContext(context.req);
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `${token}`;
    }

    const response = await fetch(`${baseUrl}${url}`, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorResponse: any = {
        statusCode: response.status,
        message: data.message || "Something went wrong",
        errorMessages: data.errorMessages,
        success: data.success,
      };
      throw errorResponse;
    }

    const successResponse: any = {
      data: data.data,
      meta: data.meta,
      success: data.success,
    };

    return successResponse;
  } catch (error) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        message: error.message,
        success: false,
      };
    }
    return error as any;
  }
};

export const serverGet = (url: string, context: GetServerSidePropsContext) =>
  serverFetch(url, "GET", context);

export const serverPost = (url: string, body: any, context: GetServerSidePropsContext) =>
  serverFetch(url, "POST", context, body);

export const serverPut = (url: string, body: any, context: GetServerSidePropsContext) =>
  serverFetch(url, "PUT", context, body);

export const serverDelete = (url: string, context: GetServerSidePropsContext) =>
  serverFetch(url, "DELETE", context);

