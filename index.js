import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://ofcmxmlhbzodankhmbow.supabase.co';
const supabaseKey = 'your-public-anon-key'; // Use your actual key
const supabase = createClient(supabaseUrl, supabaseKey);

async function authenticateUser() {
    try {
        const { data: users, error: usersError } = await supabase
            .from('users')
            .select('username');
        if (usersError) throw usersError;

        const { data: passwords, error: passwordsError } = await supabase
            .from('users')
            .select('username, password'); // Include password in the query
        if (passwordsError) throw passwordsError;

        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;

        const user = users.find(user => user.username === usernameInput);
        if (user) {
            const password = passwords.find(pass => pass.username === usernameInput)?.password;
            if (password === passwordInput) {
                // Redirect to loggedin.html for successful login
                window.location.href = "loggedin.html";
            } else {
                // Invalid password
                alert('Invalid username or password');
            }
        } else {
            // Invalid username
            alert('Invalid username or password');
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        alert('An error occurred. Please try again.');
    }
}
