import React from 'react';
import { To, useNavigate } from 'react-router-dom';

const ProFileIcon = () => {
  const navigate = useNavigate();
  let result;
  let link: To = '/mypage';

  if (localStorage.getItem('accessToken') != null) {
    const tokenDecode = localStorage
      .getItem('accessToken')
      ?.toString()
      .split('.');
    if (tokenDecode != undefined && tokenDecode.length > 0) {
      const payload = atob(tokenDecode[1]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result = JSON.parse(payload.toString());
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (result.auth && result.auth != 'USER') {
      link = `admin${link}`;
    }
  }

  return (
    <span
      onClick={() => navigate(link)}
      className="material-symbols-outlined m-4 text-48"
    >
      account_box
    </span>
  );
};

export default ProFileIcon;
