export const transformUserData = async(data: any) => {
  const { user } = data?.msg;
  return {
    // fullName: `${user?.name?.fn} ${user?.name?.ln} `,
    fullName: `${user?.fullName}  `,
    email: user?.email,
    address: user?.address,
    phone: user?.phone,
    role:user?.role
  };
};
 