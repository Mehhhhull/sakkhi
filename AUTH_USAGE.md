# Authentication Usage Guide

## For Users

### Signing Up
1. Click "Sign Up" in the navbar
2. Enter your email and password
3. Choose an anonymous pet name (or click "Random" to generate one)
4. Click "Sign Up"
5. Check your email for verification link

### Pet Names
- Pet names are used instead of your real name for privacy
- They appear in Circle of One and Bharosa Library
- You can change your pet name anytime from the user menu
- Examples: Fluffy123, Shadow456, Luna789

### Logging In
1. Click "Login" in the navbar
2. Enter your email and password
3. Click "Sign In"

### Accessing Protected Features
- **Circle of One**: Requires authentication to participate
- **Bharosa Library**: Requires authentication to contribute

### Managing Your Account
1. Click on your pet name in the navbar
2. Options available:
   - View your email
   - Change pet name
   - Sign out

## For Developers

### Using Authentication in Components

```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, petName, signOut } = useAuth();
  
  if (!user) {
    return <div>Please sign in</div>;
  }
  
  return (
    <div>
      <p>Welcome, {petName}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Protecting Routes

```jsx
import ProtectedRoute from './Components/ProtectedRoute';

<Route 
  path="/protected-page" 
  element={
    <ProtectedRoute message="Custom message here">
      <YourComponent />
    </ProtectedRoute>
  } 
/>
```

### Available Auth Methods

```jsx
const {
  user,           // Current user object
  loading,        // Loading state
  petName,        // User's pet name
  signUp,         // (email, password, petName) => Promise
  signIn,         // (email, password) => Promise
  signOut,        // () => Promise
  updatePetName,  // (newPetName) => Promise
} = useAuth();
```

### Checking Authentication Status

```jsx
const { user, loading } = useAuth();

if (loading) {
  return <div>Loading...</div>;
}

if (user) {
  // User is authenticated
} else {
  // User is not authenticated
}
```

## Customization

### Changing Pet Name List
Edit `src/Components/Auth/Signup.jsx` and modify the `petNames` array:

```jsx
const petNames = [
  'YourName1', 'YourName2', 'YourName3',
  // Add more names...
];
```

### Styling Auth Components
All auth components use Tailwind CSS classes and can be customized by editing:
- `src/Components/Auth/Login.jsx`
- `src/Components/Auth/Signup.jsx`
- `src/Components/Auth/UserMenu.jsx`

### Custom Protected Route Messages
Pass a custom message to the ProtectedRoute component:

```jsx
<ProtectedRoute message="Your custom message here">
  <YourComponent />
</ProtectedRoute>
```
