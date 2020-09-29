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
  students: Array<Student>;
  notes: Array<Note>;
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
  notes: Array<Note>;
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

export type Note = {
  __typename?: 'Note';
  id: Scalars['String'];
  note1?: Maybe<Scalars['Float']>;
  note2?: Maybe<Scalars['Float']>;
  note3?: Maybe<Scalars['Float']>;
  efm?: Maybe<Scalars['Float']>;
  student: Student;
  module: Module;
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['String'];
  fullName: Scalars['String'];
  cef?: Maybe<Scalars['String']>;
  cin?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  dateBirth: Scalars['String'];
  notes: Array<Note>;
  finalNote1?: Maybe<Scalars['Float']>;
  finalNote2?: Maybe<Scalars['Float']>;
  class: Class;
};

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
  createClass: Class;
  updateClass: Class;
  deleteClass: Class;
  createStudent: Student;
  updateStudent: Student;
  deleteStudent: Student;
  createNote: Note;
  updateNote: Note;
  deleteNote: Note;
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


export type MutationCreateClassArgs = {
  data: ClassCreateInput;
};


export type MutationUpdateClassArgs = {
  where: ClassWhereUniqueInput;
  data: ClassUpdateInput;
};


export type MutationDeleteClassArgs = {
  where: ClassWhereUniqueInput;
};


export type MutationCreateStudentArgs = {
  data: StudentCreateInput;
};


export type MutationUpdateStudentArgs = {
  where: StudentWhereUniqueInput;
  data: StudentUpdateInput;
};


export type MutationDeleteStudentArgs = {
  where: StudentWhereUniqueInput;
};


export type MutationCreateNoteArgs = {
  data: NoteCreateInput;
};


export type MutationUpdateNoteArgs = {
  where: NoteWhereUniqueInput;
  data: NoteUpdateInput;
};


export type MutationDeleteNoteArgs = {
  where: NoteWhereUniqueInput;
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

export type ClassCreateInput = {
  year: Year;
  group: Group;
  formation: FormationConnectClassInput;
  teacher: UserConnectClassInput;
};

export type FormationConnectClassInput = {
  connect: FormationWhereUniqueInput;
};

export type UserConnectClassInput = {
  connect: UserWhereUniqueInput;
};

export type UserWhereUniqueInput = {
  id: Scalars['String'];
};

export type ClassWhereUniqueInput = {
  id: Scalars['String'];
};

export type ClassUpdateInput = {
  year?: Maybe<Year>;
  group?: Maybe<Group>;
  formation?: Maybe<FormationConnectClassInput>;
  teacher?: Maybe<UserConnectClassInput>;
};

export type StudentCreateInput = {
  fullName: Scalars['String'];
  cef?: Maybe<Scalars['String']>;
  cin?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  dateBirth: Scalars['String'];
  finalNote1?: Maybe<Scalars['Float']>;
  finalNote2?: Maybe<Scalars['Float']>;
  class: ClassConnectStudentInput;
};

export type ClassConnectStudentInput = {
  connect: ClassWhereUniqueInput;
};

export type StudentWhereUniqueInput = {
  id: Scalars['String'];
};

export type StudentUpdateInput = {
  fullName?: Maybe<Scalars['String']>;
  cef?: Maybe<Scalars['String']>;
  cin?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  dateBirth?: Maybe<Scalars['String']>;
  finalNote1?: Maybe<Scalars['Float']>;
  finalNote2?: Maybe<Scalars['Float']>;
  class?: Maybe<ClassConnectStudentInput>;
};

export type NoteCreateInput = {
  note1?: Maybe<Scalars['Float']>;
  note2?: Maybe<Scalars['Float']>;
  note3?: Maybe<Scalars['Float']>;
  efm?: Maybe<Scalars['Float']>;
  student: StudentConnectNoteInput;
  module: ModuleConnectNoteInput;
};

export type StudentConnectNoteInput = {
  connect: StudentWhereUniqueInput;
};

export type ModuleConnectNoteInput = {
  connect: ModuleWhereUniqueInput;
};

export type NoteWhereUniqueInput = {
  id: Scalars['String'];
};

export type NoteUpdateInput = {
  note1?: Maybe<Scalars['Float']>;
  note2?: Maybe<Scalars['Float']>;
  note3?: Maybe<Scalars['Float']>;
  efm?: Maybe<Scalars['Float']>;
};

export type ClassFragment = (
  { __typename?: 'Class' }
  & Pick<Class, 'id' | 'year' | 'group'>
);

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

export type CreateClassMutationVariables = Exact<{
  year: Year;
  group: Group;
  formation: FormationConnectClassInput;
  teacher: UserConnectClassInput;
}>;


export type CreateClassMutation = (
  { __typename?: 'Mutation' }
  & { createClass: (
    { __typename?: 'Class' }
    & { formation: (
      { __typename?: 'Formation' }
      & FormationFragment
    ), teacher: (
      { __typename?: 'User' }
      & UserFragment
    ) }
    & ClassFragment
  ) }
);

export type DeleteClassMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteClassMutation = (
  { __typename?: 'Mutation' }
  & { deleteClass: (
    { __typename?: 'Class' }
    & ClassFragment
  ) }
);

export type UpdateClassMutationVariables = Exact<{
  id: Scalars['String'];
  year?: Maybe<Year>;
  group?: Maybe<Group>;
  formation?: Maybe<FormationConnectClassInput>;
  teacher?: Maybe<UserConnectClassInput>;
}>;


export type UpdateClassMutation = (
  { __typename?: 'Mutation' }
  & { updateClass: (
    { __typename?: 'Class' }
    & { formation: (
      { __typename?: 'Formation' }
      & FormationFragment
    ), teacher: (
      { __typename?: 'User' }
      & UserFragment
    ) }
    & ClassFragment
  ) }
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

export type ClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type ClassesQuery = (
  { __typename?: 'Query' }
  & { classes: Array<(
    { __typename?: 'Class' }
    & { formation: (
      { __typename?: 'Formation' }
      & FormationFragment
    ), teacher: (
      { __typename?: 'User' }
      & UserFragment
    ) }
    & ClassFragment
  )> }
);

export type FormationWithModulesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FormationWithModulesQuery = (
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

export type FormationsWithClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type FormationsWithClassesQuery = (
  { __typename?: 'Query' }
  & { formations: Array<(
    { __typename?: 'Formation' }
    & { classes: Array<(
      { __typename?: 'Class' }
      & ClassFragment
    )> }
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

export const ClassFragmentDoc = gql`
    fragment Class on Class {
  id
  year
  group
}
    `;
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
export const CreateClassDocument = gql`
    mutation CreateClass($year: Year!, $group: Group!, $formation: FormationConnectClassInput!, $teacher: UserConnectClassInput!) {
  createClass(data: {year: $year, group: $group, formation: $formation, teacher: $teacher}) {
    ...Class
    formation {
      ...Formation
    }
    teacher {
      ...User
    }
  }
}
    ${ClassFragmentDoc}
${FormationFragmentDoc}
${UserFragmentDoc}`;
export type CreateClassMutationFn = Apollo.MutationFunction<CreateClassMutation, CreateClassMutationVariables>;

/**
 * __useCreateClassMutation__
 *
 * To run a mutation, you first call `useCreateClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClassMutation, { data, loading, error }] = useCreateClassMutation({
 *   variables: {
 *      year: // value for 'year'
 *      group: // value for 'group'
 *      formation: // value for 'formation'
 *      teacher: // value for 'teacher'
 *   },
 * });
 */
export function useCreateClassMutation(baseOptions?: Apollo.MutationHookOptions<CreateClassMutation, CreateClassMutationVariables>) {
        return Apollo.useMutation<CreateClassMutation, CreateClassMutationVariables>(CreateClassDocument, baseOptions);
      }
export type CreateClassMutationHookResult = ReturnType<typeof useCreateClassMutation>;
export type CreateClassMutationResult = Apollo.MutationResult<CreateClassMutation>;
export type CreateClassMutationOptions = Apollo.BaseMutationOptions<CreateClassMutation, CreateClassMutationVariables>;
export const DeleteClassDocument = gql`
    mutation DeleteClass($id: String!) {
  deleteClass(where: {id: $id}) {
    ...Class
  }
}
    ${ClassFragmentDoc}`;
export type DeleteClassMutationFn = Apollo.MutationFunction<DeleteClassMutation, DeleteClassMutationVariables>;

/**
 * __useDeleteClassMutation__
 *
 * To run a mutation, you first call `useDeleteClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClassMutation, { data, loading, error }] = useDeleteClassMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClassMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClassMutation, DeleteClassMutationVariables>) {
        return Apollo.useMutation<DeleteClassMutation, DeleteClassMutationVariables>(DeleteClassDocument, baseOptions);
      }
export type DeleteClassMutationHookResult = ReturnType<typeof useDeleteClassMutation>;
export type DeleteClassMutationResult = Apollo.MutationResult<DeleteClassMutation>;
export type DeleteClassMutationOptions = Apollo.BaseMutationOptions<DeleteClassMutation, DeleteClassMutationVariables>;
export const UpdateClassDocument = gql`
    mutation UpdateClass($id: String!, $year: Year, $group: Group, $formation: FormationConnectClassInput, $teacher: UserConnectClassInput) {
  updateClass(where: {id: $id}, data: {year: $year, group: $group, formation: $formation, teacher: $teacher}) {
    ...Class
    formation {
      ...Formation
    }
    teacher {
      ...User
    }
  }
}
    ${ClassFragmentDoc}
${FormationFragmentDoc}
${UserFragmentDoc}`;
export type UpdateClassMutationFn = Apollo.MutationFunction<UpdateClassMutation, UpdateClassMutationVariables>;

/**
 * __useUpdateClassMutation__
 *
 * To run a mutation, you first call `useUpdateClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClassMutation, { data, loading, error }] = useUpdateClassMutation({
 *   variables: {
 *      id: // value for 'id'
 *      year: // value for 'year'
 *      group: // value for 'group'
 *      formation: // value for 'formation'
 *      teacher: // value for 'teacher'
 *   },
 * });
 */
export function useUpdateClassMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClassMutation, UpdateClassMutationVariables>) {
        return Apollo.useMutation<UpdateClassMutation, UpdateClassMutationVariables>(UpdateClassDocument, baseOptions);
      }
export type UpdateClassMutationHookResult = ReturnType<typeof useUpdateClassMutation>;
export type UpdateClassMutationResult = Apollo.MutationResult<UpdateClassMutation>;
export type UpdateClassMutationOptions = Apollo.BaseMutationOptions<UpdateClassMutation, UpdateClassMutationVariables>;
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
export const ClassesDocument = gql`
    query Classes {
  classes {
    ...Class
    formation {
      ...Formation
    }
    teacher {
      ...User
    }
  }
}
    ${ClassFragmentDoc}
${FormationFragmentDoc}
${UserFragmentDoc}`;

/**
 * __useClassesQuery__
 *
 * To run a query within a React component, call `useClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClassesQuery({
 *   variables: {
 *   },
 * });
 */
export function useClassesQuery(baseOptions?: Apollo.QueryHookOptions<ClassesQuery, ClassesQueryVariables>) {
        return Apollo.useQuery<ClassesQuery, ClassesQueryVariables>(ClassesDocument, baseOptions);
      }
export function useClassesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClassesQuery, ClassesQueryVariables>) {
          return Apollo.useLazyQuery<ClassesQuery, ClassesQueryVariables>(ClassesDocument, baseOptions);
        }
export type ClassesQueryHookResult = ReturnType<typeof useClassesQuery>;
export type ClassesLazyQueryHookResult = ReturnType<typeof useClassesLazyQuery>;
export type ClassesQueryResult = Apollo.QueryResult<ClassesQuery, ClassesQueryVariables>;
export const FormationWithModulesDocument = gql`
    query FormationWithModules($id: String!) {
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
 * __useFormationWithModulesQuery__
 *
 * To run a query within a React component, call `useFormationWithModulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormationWithModulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormationWithModulesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFormationWithModulesQuery(baseOptions?: Apollo.QueryHookOptions<FormationWithModulesQuery, FormationWithModulesQueryVariables>) {
        return Apollo.useQuery<FormationWithModulesQuery, FormationWithModulesQueryVariables>(FormationWithModulesDocument, baseOptions);
      }
export function useFormationWithModulesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormationWithModulesQuery, FormationWithModulesQueryVariables>) {
          return Apollo.useLazyQuery<FormationWithModulesQuery, FormationWithModulesQueryVariables>(FormationWithModulesDocument, baseOptions);
        }
export type FormationWithModulesQueryHookResult = ReturnType<typeof useFormationWithModulesQuery>;
export type FormationWithModulesLazyQueryHookResult = ReturnType<typeof useFormationWithModulesLazyQuery>;
export type FormationWithModulesQueryResult = Apollo.QueryResult<FormationWithModulesQuery, FormationWithModulesQueryVariables>;
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
export const FormationsWithClassesDocument = gql`
    query FormationsWithClasses {
  formations {
    ...Formation
    classes {
      ...Class
    }
  }
}
    ${FormationFragmentDoc}
${ClassFragmentDoc}`;

/**
 * __useFormationsWithClassesQuery__
 *
 * To run a query within a React component, call `useFormationsWithClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormationsWithClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormationsWithClassesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFormationsWithClassesQuery(baseOptions?: Apollo.QueryHookOptions<FormationsWithClassesQuery, FormationsWithClassesQueryVariables>) {
        return Apollo.useQuery<FormationsWithClassesQuery, FormationsWithClassesQueryVariables>(FormationsWithClassesDocument, baseOptions);
      }
export function useFormationsWithClassesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormationsWithClassesQuery, FormationsWithClassesQueryVariables>) {
          return Apollo.useLazyQuery<FormationsWithClassesQuery, FormationsWithClassesQueryVariables>(FormationsWithClassesDocument, baseOptions);
        }
export type FormationsWithClassesQueryHookResult = ReturnType<typeof useFormationsWithClassesQuery>;
export type FormationsWithClassesLazyQueryHookResult = ReturnType<typeof useFormationsWithClassesLazyQuery>;
export type FormationsWithClassesQueryResult = Apollo.QueryResult<FormationsWithClassesQuery, FormationsWithClassesQueryVariables>;
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