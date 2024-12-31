import { api } from "@kaneo/libs";
import { useMutation } from "@tanstack/react-query";
function App() {
  const { data, mutate } = useMutation({
    mutationFn: api.user["sign-up"].post
  })

  console.log(data)

  return <button onClick={() => mutate({
    email: 'andrej1@mail.com',
    name: 'Andrej1',
    password: 'andrej$123'
  })}>Hi</button>;
}

export default App;
