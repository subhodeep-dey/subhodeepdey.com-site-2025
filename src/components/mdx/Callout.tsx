'use client';

import React from 'react';
import { AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'error' | 'success';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle,
};

const styles = {
  info: 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  warning: 'bg-yellow-50 border-yellow-500 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  error: 'bg-red-50 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  success: 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

const iconColors = {
  info: 'text-blue-500 dark:text-blue-400',
  warning: 'text-yellow-500 dark:text-yellow-400',
  error: 'text-red-500 dark:text-red-400',
  success: 'text-green-500 dark:text-green-400',
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const Icon = icons[type];
  
  return (
    <div className={`p-4 border-l-4 rounded-r-lg my-6 ${styles[type]}`}>
      <div className="flex items-start">
        <div className={`mr-3 mt-1 ${iconColors[type]}`}>
          <Icon size={20} />
        </div>
        <div>
          {title && <h4 className="font-bold mb-2">{title}</h4>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}