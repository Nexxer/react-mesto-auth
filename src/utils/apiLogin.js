const baseUrl = 'https://auth.nomoreparties.co';

export const registration = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
}

export const onLogin = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
}

export const getJWT = (jwt) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};