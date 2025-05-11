export const transformUserData = async (data: any) => {
  const { user } = data?.msg;
  return {
<<<<<<< HEAD
=======
    // fullName: `${user?.fullName}  `,
>>>>>>> staging
    fullName: `${user?.fullName}  `,
    email: user?.email,
    address: user?.address,
    phone: user?.phone,
    role: user?.role,
  };
};
 