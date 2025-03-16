import { useContext } from "react";
import {
  LoginUserContext,
  LoginUserContextType,
} from "../providers/LoginUserProvider";

// ログインユーザー情報を取得するためのカスタムフック
export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext);
