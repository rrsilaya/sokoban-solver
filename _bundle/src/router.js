import { Router } from 'express';
import { bfs_search, dfs_search } from './solver';

const router = Router();

router.post('/api/bfs', async (req, res) => {
  try {
    const time_start = new Date();
    const solution = await bfs_search(req.body.board);

    res.status(200).json({
      status: 200,
      message: 'Successfully solved sokoban problem',
      data: {
        solution: solution.path,
        duration: (new Date - time_start) / 1000,
        nodes: solution.nodes
      }
    });
  } catch (status) {
    res.status(status).json({ status, message: 'Internal server error while trying to solve using BFS.' });
  }
});

router.post('/api/dfs', async (req, res) => {
  try {
    const time_start = new Date();
    const solution = await dfs_search(req.body.board);

    res.status(200).json({
      status: 200,
      message: 'Successfully solved sokoban problem',
      data: {
        solution: solution.path,
        duration: (new Date - time_start) / 1000,
        nodes: solution.nodes
      }
    });
  } catch (status) {
    res.status(status).json({ status, message: 'Internal server error while trying to solve using DFS.' });
  }
});

export default router;