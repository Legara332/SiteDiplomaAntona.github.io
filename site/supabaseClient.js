import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Экспортируем supabase
export const supabase = createClient(
  'https://skbzrvevhmcjaiefmyuh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYnpydmV2aG1jamFpZWZteXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4ODY1NDIsImV4cCI6MjA1NzQ2MjU0Mn0.h_bZ5TYSiT7YTEjARr7KqR2UXLnQdBxwEdg9VaDK73c'
);

// Функция регистрации через Supabase
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${window.location.origin}/account.html` // Перенаправление после подтверждения
    }
  });
  return { data, error };
}
  
  // Функция входа через Supabase
  export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return { data, error };
  }
  
  // Получение текущего пользователя
  export function getCurrentUser() {
    return supabase.auth.getUser();
  }