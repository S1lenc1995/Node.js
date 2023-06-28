import PostsService from '../../bll/posts/posts.service';
import { PostsRepository } from '../../dal/posts/posts.repository';


describe('PostsService', () => {
  let postsService: PostsService;
  let postsRepository: PostsRepository;

  beforeEach(() => {
    postsRepository = {
      manager: {
        createQueryBuilder: jest.fn(),
      },
      getAllPosts: jest.fn(),
      getById: jest.fn().mockResolvedValue(1),
      createdNewspost: jest.fn(),
      updatedNewsposts: jest.fn(),
      deleteById: jest.fn(),
    };
    postsService = new PostsService(postsRepository);
  });

  describe('getAllPosts', () => {
    it('should return all posts', async () => {
      const mockParams = { size: 10, page: 1, filter: {},};
      const mockResult = {
        total: 2,
        result: [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }],
        size: 10,
        page: 1,
      };

      (postsRepository.getAllPosts as jest.Mock).mockResolvedValue(mockResult);

      const result = await postsService.getAllPosts(mockParams);

      expect(postsRepository.getAllPosts).toHaveBeenCalledWith(mockParams);
      expect(result).toEqual(mockResult);
    });
  });


  describe('getById', () => {
    it('should return a post by ID', async () => {
      const mockId = 1;
      const mockPost = { id: 1, title: 'Post 1' };

      (postsRepository.getById as jest.Mock).mockResolvedValue(mockPost);

      const result = await postsService.getById(mockId);

      expect(postsRepository.getById).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockPost);
    });
  });

  describe('createdNewspost', () => {
    it('should create a new post', async () => {
      const mockNewPost = { 
        title: 'New Post',
        content: 'Post Content',
        id: 1,
        createDate: new Date()
       };
      const mockCreatedPost = { id: 1, title: 'New Post' };

      (postsRepository.createdNewspost as jest.Mock).mockResolvedValue(mockCreatedPost);

      const result = await postsService.createdNewspost(mockNewPost);

      expect(postsRepository.createdNewspost).toHaveBeenCalledWith(mockNewPost);
      expect(result).toEqual(mockCreatedPost);
    });
  });
  describe('updatedNewsposts', () => {
    it('should update a post', async () => {
      const mockId = 1;
      const mockPost = { title: 'Updated Post' };
      const mockUpdatedPost = { id: 1, title: 'Updated Post' };

      (postsRepository.updatedNewsposts  as jest.Mock).mockResolvedValue(mockUpdatedPost);

      const result = await postsService.updatedNewsposts(mockId, mockPost);

      expect(postsRepository.updatedNewsposts).toHaveBeenCalledWith(mockId, mockPost);
      expect(result).toEqual(mockUpdatedPost);
    });
  });

  describe('deleteById', () => {
    it('should delete a post by ID', async () => {
      const mockId = 1;
      const mockDeletedCount = 1;

      (postsRepository.deleteById  as jest.Mock).mockResolvedValue(mockDeletedCount);

      const result = await postsService.deleteById(mockId);

      expect(postsRepository.deleteById).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockDeletedCount);
    });
  }); 
});