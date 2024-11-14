"use client";

import * as React from "react";
import { useToast as useToastOriginal } from "@/components/ui/toast";

export const useToast = () => {
  return useToastOriginal();
};