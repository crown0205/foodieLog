import HeaderButton from '@/components/common/HeaderButton';
import React from 'react';

function EditProfileHeaderRight(onSubmit: () => void) {
  return <HeaderButton labelText="완료" onPress={onSubmit} />;
}

export default EditProfileHeaderRight;
