import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  users: Array<User>;
  formation?: Maybe<Formation>;
  formations: Array<Formation>;
  modules: Array<Module>;
  classes: Array<Class>;
};


export type QueryFormationArgs = {
  where: FormationWhereUniqueInput;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  role: Role;
};

export enum Role {
  Admin = 'ADMIN',
  Teacher = 'TEACHER'
}

export type FormationWhereUniqueInput = {
  id: Scalars['String'];
};

export type Formation = {
  __typename?: 'Formation';
  id: Scalars['String'];
  name: Scalars['String'];
  descUrl: Scalars['String'];
  level: Level;
  modules: Array<Module>;
  classes: Array<Class>;
};

export enum Level {
  TechnicienSpecialise = 'Technicien_Specialise',
  Technicien = 'Technicien',
  Qualification = 'Qualification',
  Specialisation = 'Specialisation',
  BacProfessionnel = 'Bac_Professionnel',
  ParcoursCollegial = 'Parcours_Collegial',
  FormationQualifiante = 'Formation_Qualifiante'
}

export type Module = {
  __typename?: 'Module';
  id: Scalars['String'];
  number: Scalars['Int'];
  name: Scalars['String'];
  classes: Array<Class>;
  formation: Formation;
};

export type Class = {
  __typename?: 'Class';
  id: Scalars['String'];
  year: Year;
  group: Group;
  modules: Array<Module>;
  formation: Formation;
  teacher: User;
};

export enum Year {
  Premiere = 'Premiere',
  Deuxieme = 'Deuxieme'
}

export enum Group {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E'
}

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<User>;
  login?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']>;
  createFormation: Formation;
  updateFormation: Formation;
  deleteFormation: Formation;
  createModule: Module;
  updateModule: Module;
  deleteModule: Module;
};


export type MutationRegisterArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateFormationArgs = {
  data: FormationCreateInput;
};


export type MutationUpdateFormationArgs = {
  where: FormationWhereUniqueInput;
  data: FormationUpdateInput;
};


export type MutationDeleteFormationArgs = {
  where: FormationWhereUniqueInput;
};


export type MutationCreateModuleArgs = {
  data: ModuleCreateInput;
};


export type MutationUpdateModuleArgs = {
  where: ModuleWhereUniqueInput;
  data: ModuleUpdateInput;
};


export type MutationDeleteModuleArgs = {
  where: ModuleWhereUniqueInput;
};

export type FormationCreateInput = {
  name: Scalars['String'];
  descUrl: Scalars['String'];
  level: Level;
};

export type FormationUpdateInput = {
  name?: Maybe<Scalars['String']>;
  descUrl?: Maybe<Scalars['String']>;
  level?: Maybe<Level>;
};

export type ModuleCreateInput = {
  number: Scalars['Int'];
  name: Scalars['String'];
  formation: FormationConnectModuleInput;
};

export type FormationConnectModuleInput = {
  connect: FormationWhereUniqueInput;
};

export type ModuleWhereUniqueInput = {
  id: Scalars['String'];
};

export type ModuleUpdateInput = {
  number?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  formation?: Maybe<FormationConnectModuleInput>;
};

export type FormationFragment = (
  { __typename?: 'Formation' }
  & Pick<Formation, 'id' | 'name' | 'descUrl' | 'level'>
);

export type ModuleFragment = (
  { __typename?: 'Module' }
  & Pick<Module, 'id' | 'number' | 'name'>
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'email' | 'role'>
);

export type CreateFormationMutationVariables = Exact<{
  name: Scalars['String'];
  descUrl: Scalars['String'];
  level: Level;
}>;


export type CreateFormationMutation = (
  { __typename?: 'Mutation' }
  & { createFormation: (
    { __typename?: 'Formation' }
    & FormationFragment
  ) }
);

export type DeleteFormationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteFormationMutation = (
  { __typename?: 'Mutation' }
  & { deleteFormation: (
    { __typename?: 'Formation' }
    & FormationFragment
  ) }
);

export type UpdateFormationMutationVariables = Exact<{
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  descUrl?: Maybe<Scalars['String']>;
  level?: Maybe<Level>;
}>;


export type UpdateFormationMutation = (
  { __typename?: 'Mutation' }
  & { updateFormation: (
    { __typename?: 'Formation' }
    & FormationFragment
  ) }
);

export type CreateModuleMutationVariables = Exact<{
  number: Scalars['Int'];
  name: Scalars['String'];
  formation: FormationConnectModuleInput;
}>;


export type CreateModuleMutation = (
  { __typename?: 'Mutation' }
  & { createModule: (
    { __typename?: 'Module' }
    & ModuleFragment
  ) }
);

export type DeleteModuleMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteModuleMutation = (
  { __typename?: 'Mutation' }
  & { deleteModule: (
    { __typename?: 'Module' }
    & ModuleFragment
  ) }
);

export type UpdateModuleMutationVariables = Exact<{
  id: Scalars['String'];
  number?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  formation?: Maybe<FormationConnectModuleInput>;
}>;


export type UpdateModuleMutation = (
  { __typename?: 'Mutation' }
  & { updateModule: (
    { __typename?: 'Module' }
    & ModuleFragment
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type FormationQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FormationQuery = (
  { __typename?: 'Query' }
  & { formation?: Maybe<(
    { __typename?: 'Formation' }
    & { modules: Array<(
      { __typename?: 'Module' }
      & ModuleFragment
    )> }
    & FormationFragment
  )> }
);

export type FormationsQueryVariables = Exact<{ [key: string]: never; }>;


export type FormationsQuery = (
  { __typename?: 'Query' }
  & { formations: Array<(
    { __typename?: 'Formation' }
    & FormationFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export const FormationFragmentDoc = gql`
    fragment Formation on Formation {
  id
  name
  descUrl
  level
}
    `;
export const ModuleFragmentDoc = gql`
    fragment Module on Module {
  id
  number
  name
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
  email
  role
}
    `;
export const CreateFormationDocument = gql`
    mutation CreateFormation($name: String!, $descUrl: String!, $level: Level!) {
  createFormation(data: {name: $name, descUrl: $descUrl, level: $level}) {
    ...Formation
  }
}
    ${FormationFragmentDoc}`;
export type CreateFormationMutationFn = Apollo.MutationFunction<CreateFormationMutation, CreateFormationMutationVariables>;

/**
 * __useCreateFormationMutation__
 *
 * To run a mutation, you first call `useCreateFormationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFormationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFormationMutation, { data, loading, error }] = useCreateFormationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      descUrl: // value for 'descUrl'
 *      level: // value for 'level'
 *   },
 * });
 */
export function useCreateFormationMutation(baseOptions?: Apollo.MutationHookOptions<CreateFormationMutation, CreateFormationMutationVariables>) {
        return Apollo.useMutation<CreateFormationMutation, CreateFormationMutationVariables>(CreateFormationDocument, baseOptions);
      }
export type CreateFormationMutationHookResult = ReturnType<typeof useCreateFormationMutation>;
export type CreateFormationMutationResult = Apollo.MutationResult<CreateFormationMutation>;
export type CreateFormationMutationOptions = Apollo.BaseMutationOptions<CreateFormationMutation, CreateFormationMutationVariables>;
export const DeleteFormationDocument = gql`
    mutation DeleteFormation($id: String!) {
  deleteFormation(where: {id: $id}) {
    ...Formation
  }
}
    ${FormationFragmentDoc}`;
export type DeleteFormationMutationFn = Apollo.MutationFunction<DeleteFormationMutation, DeleteFormationMutationVariables>;

/**
 * __useDeleteFormationMutation__
 *
 * To run a mutation, you first call `useDeleteFormationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFormationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFormationMutation, { data, loading, error }] = useDeleteFormationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFormationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFormationMutation, DeleteFormationMutationVariables>) {
        return Apollo.useMutation<DeleteFormationMutation, DeleteFormationMutationVariables>(DeleteFormationDocument, baseOptions);
      }
export type DeleteFormationMutationHookResult = ReturnType<typeof useDeleteFormationMutation>;
export type DeleteFormationMutationResult = Apollo.MutationResult<DeleteFormationMutation>;
export type DeleteFormationMutationOptions = Apollo.BaseMutationOptions<DeleteFormationMutation, DeleteFormationMutationVariables>;
export const UpdateFormationDocument = gql`
    mutation UpdateFormation($id: String!, $name: String, $descUrl: String, $level: Level) {
  updateFormation(where: {id: $id}, data: {name: $name, descUrl: $descUrl, level: $level}) {
    ...Formation
  }
}
    ${FormationFragmentDoc}`;
export type UpdateFormationMutationFn = Apollo.MutationFunction<UpdateFormationMutation, UpdateFormationMutationVariables>;

/**
 * __useUpdateFormationMutation__
 *
 * To run a mutation, you first call `useUpdateFormationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFormationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFormationMutation, { data, loading, error }] = useUpdateFormationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      descUrl: // value for 'descUrl'
 *      level: // value for 'level'
 *   },
 * });
 */
export function useUpdateFormationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFormationMutation, UpdateFormationMutationVariables>) {
        return Apollo.useMutation<UpdateFormationMutation, UpdateFormationMutationVariables>(UpdateFormationDocument, baseOptions);
      }
export type UpdateFormationMutationHookResult = ReturnType<typeof useUpdateFormationMutation>;
export type UpdateFormationMutationResult = Apollo.MutationResult<UpdateFormationMutation>;
export type UpdateFormationMutationOptions = Apollo.BaseMutationOptions<UpdateFormationMutation, UpdateFormationMutationVariables>;
export const CreateModuleDocument = gql`
    mutation CreateModule($number: Int!, $name: String!, $formation: FormationConnectModuleInput!) {
  createModule(data: {number: $number, name: $name, formation: $formation}) {
    ...Module
  }
}
    ${ModuleFragmentDoc}`;
export type CreateModuleMutationFn = Apollo.MutationFunction<CreateModuleMutation, CreateModuleMutationVariables>;

/**
 * __useCreateModuleMutation__
 *
 * To run a mutation, you first call `useCreateModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createModuleMutation, { data, loading, error }] = useCreateModuleMutation({
 *   variables: {
 *      number: // value for 'number'
 *      name: // value for 'name'
 *      formation: // value for 'formation'
 *   },
 * });
 */
export function useCreateModuleMutation(baseOptions?: Apollo.MutationHookOptions<CreateModuleMutation, CreateModuleMutationVariables>) {
        return Apollo.useMutation<CreateModuleMutation, CreateModuleMutationVariables>(CreateModuleDocument, baseOptions);
      }
export type CreateModuleMutationHookResult = ReturnType<typeof useCreateModuleMutation>;
export type CreateModuleMutationResult = Apollo.MutationResult<CreateModuleMutation>;
export type CreateModuleMutationOptions = Apollo.BaseMutationOptions<CreateModuleMutation, CreateModuleMutationVariables>;
export const DeleteModuleDocument = gql`
    mutation DeleteModule($id: String!) {
  deleteModule(where: {id: $id}) {
    ...Module
  }
}
    ${ModuleFragmentDoc}`;
export type DeleteModuleMutationFn = Apollo.MutationFunction<DeleteModuleMutation, DeleteModuleMutationVariables>;

/**
 * __useDeleteModuleMutation__
 *
 * To run a mutation, you first call `useDeleteModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteModuleMutation, { data, loading, error }] = useDeleteModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteModuleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteModuleMutation, DeleteModuleMutationVariables>) {
        return Apollo.useMutation<DeleteModuleMutation, DeleteModuleMutationVariables>(DeleteModuleDocument, baseOptions);
      }
export type DeleteModuleMutationHookResult = ReturnType<typeof useDeleteModuleMutation>;
export type DeleteModuleMutationResult = Apollo.MutationResult<DeleteModuleMutation>;
export type DeleteModuleMutationOptions = Apollo.BaseMutationOptions<DeleteModuleMutation, DeleteModuleMutationVariables>;
export const UpdateModuleDocument = gql`
    mutation UpdateModule($id: String!, $number: Int, $name: String, $formation: FormationConnectModuleInput) {
  updateModule(where: {id: $id}, data: {number: $number, name: $name, formation: $formation}) {
    ...Module
  }
}
    ${ModuleFragmentDoc}`;
export type UpdateModuleMutationFn = Apollo.MutationFunction<UpdateModuleMutation, UpdateModuleMutationVariables>;

/**
 * __useUpdateModuleMutation__
 *
 * To run a mutation, you first call `useUpdateModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModuleMutation, { data, loading, error }] = useUpdateModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      number: // value for 'number'
 *      name: // value for 'name'
 *      formation: // value for 'formation'
 *   },
 * });
 */
export function useUpdateModuleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateModuleMutation, UpdateModuleMutationVariables>) {
        return Apollo.useMutation<UpdateModuleMutation, UpdateModuleMutationVariables>(UpdateModuleDocument, baseOptions);
      }
export type UpdateModuleMutationHookResult = ReturnType<typeof useUpdateModuleMutation>;
export type UpdateModuleMutationResult = Apollo.MutationResult<UpdateModuleMutation>;
export type UpdateModuleMutationOptions = Apollo.BaseMutationOptions<UpdateModuleMutation, UpdateModuleMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const FormationDocument = gql`
    query Formation($id: String!) {
  formation(where: {id: $id}) {
    ...Formation
    modules {
      ...Module
    }
  }
}
    ${FormationFragmentDoc}
${ModuleFragmentDoc}`;

/**
 * __useFormationQuery__
 *
 * To run a query within a React component, call `useFormationQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFormationQuery(baseOptions?: Apollo.QueryHookOptions<FormationQuery, FormationQueryVariables>) {
        return Apollo.useQuery<FormationQuery, FormationQueryVariables>(FormationDocument, baseOptions);
      }
export function useFormationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormationQuery, FormationQueryVariables>) {
          return Apollo.useLazyQuery<FormationQuery, FormationQueryVariables>(FormationDocument, baseOptions);
        }
export type FormationQueryHookResult = ReturnType<typeof useFormationQuery>;
export type FormationLazyQueryHookResult = ReturnType<typeof useFormationLazyQuery>;
export type FormationQueryResult = Apollo.QueryResult<FormationQuery, FormationQueryVariables>;
export const FormationsDocument = gql`
    query Formations {
  formations {
    ...Formation
  }
}
    ${FormationFragmentDoc}`;

/**
 * __useFormationsQuery__
 *
 * To run a query within a React component, call `useFormationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFormationsQuery(baseOptions?: Apollo.QueryHookOptions<FormationsQuery, FormationsQueryVariables>) {
        return Apollo.useQuery<FormationsQuery, FormationsQueryVariables>(FormationsDocument, baseOptions);
      }
export function useFormationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormationsQuery, FormationsQueryVariables>) {
          return Apollo.useLazyQuery<FormationsQuery, FormationsQueryVariables>(FormationsDocument, baseOptions);
        }
export type FormationsQueryHookResult = ReturnType<typeof useFormationsQuery>;
export type FormationsLazyQueryHookResult = ReturnType<typeof useFormationsLazyQuery>;
export type FormationsQueryResult = Apollo.QueryResult<FormationsQuery, FormationsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;