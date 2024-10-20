import { instance } from '../api/axios.api';
import {
  IGetMember,
  IMember,
  IPostMember,
  IUpdateMember,
} from '../types/types';


export const MemberService = {
  async getAllMembers(): Promise<IGetMember[]> {
    const { data } = await instance.get<IGetMember[]>(`api/member/get-members`);
    return data;
  },

  async createMember(memberData: IPostMember): Promise<IMember> {
    const { data } = await instance.post<IMember>(
      `api/member/create`,
      memberData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  },

  async updateMember(
    memberId: string | undefined,
    memberData: IUpdateMember,
  ): Promise<IMember> {
    const { data } = await instance.put<IMember>(
      `api/member/update/${memberId}`,
      memberData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  },

  async deleteMember(memberId: string | null): Promise<string> {
    const { data } = await instance.delete<string>(
      `api/member/delete/${memberId}`,
    );
    return data;
  },
  // async createPost(postData: ICreatePost): Promise<ICreatePostResponse | null> {
  //   const { data } = await instance.post<ICreatePostResponse | null>(
  //     `api/post/create`,
  //     postData,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  //   return data;
  // },
  // async getPosts(currentUserId: string | undefined): Promise<IGetPosts> {
  //   const { data } = await instance.get<IGetPosts>(
  //     `api/post/get-posts?userId=${currentUserId}`
  //   );
  //   return data;
  // },
  // async getPostsWithSearchQuery(searchQuery: string | undefined): Promise<IGetPosts> {
  //   const { data } = await instance.get<IGetPosts>(
  //     `api/post/get-posts?${searchQuery}`
  //   );
  //   return data;
  // },
  // async getAllPosts(): Promise<IGetPosts> {
  //   const { data } = await instance.get<IGetPosts>(`api/post/get-posts`);
  //   return data;
  // },
  // async getPostsWithStartIndex(
  //   currentUserId: string | undefined,
  //   startIndex: number
  // ): Promise<IGetPosts> {
  //   const { data } = await instance.get<IGetPosts>(
  //     `api/post/get-posts?userId=${currentUserId}&startIndex=${startIndex}`
  //   );
  //   return data;
  // },
  // async getPostBySlug(postSlug: string | undefined): Promise<IGetPosts> {
  //   const { data } = await instance.get<IGetPosts>(
  //     `api/post/get-posts?slug=${postSlug}`
  //   );
  //   return data;
  // },
  // async getPostById(postId: string | undefined): Promise<IGetPosts> {
  //   const { data } = await instance.get<IGetPosts>(
  //     `api/post/get-posts?postId=${postId}`
  //   );
  //   return data;
  // },
  // async getPostWithLimit(): Promise<IGetPosts> {
  //   const { data } = await instance.get<IGetPosts>(
  //     `api/post/get-posts?limit=3`
  //   );
  //   return data;
  // },
  // async getPostsWithLimitFive(): Promise<IGetPosts> {
  //   const { data } = await instance.get<IGetPosts>(
  //     `api/post/get-posts?limit=3`
  //   );
  //   return data;
  // },
  // async deletePostById(
  //   postIdToDelete: string,
  //   currentUserId: string | undefined
  // ): Promise<string> {
  //   const { data } = await instance.delete<string>(
  //     `api/post/delete-post/${postIdToDelete}/${currentUserId}`
  //   );
  //   return data;
  // },
  // async updatePostById(
  //   postId: string | undefined,
  //   currentUserId: string | undefined,
  //   postData: IUpdatePost
  // ): Promise<IUpdatePostResponse | null> {
  //   const { data } = await instance.put<IUpdatePostResponse | null>(
  //     `api/post/update-post/${postId}/${currentUserId}`,
  //     postData,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  //   return data;
  // },
};
