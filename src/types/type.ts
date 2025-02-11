export type UserType = {
  name: string;
  email: string;
  avatar_url: string;
};

export type PastaType = {
  id: string;
  title: string;
  content: string;
  variables: {
    name: string;
  };
  type: string;
  tags: string[];
  created_at: string;
  edited_at: string;
  user_id: string;
  user_meta_data: UserType;
};
