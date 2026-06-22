# Debug Session: paragon-node-click

## Status: [OPEN]

## Problem Description
点击巅峰盘起始节点后，相邻节点点击后没有被点亮。应该从起始节点开始，逐个点亮相邻节点，直到Gate节点。

## Hypotheses
1. **H1: reachableNodes计算逻辑问题** - 起始节点点亮后，相邻节点没有被正确添加到可达集合
2. **H2: handleNodeClick条件判断问题** - isReachable判断可能不正确，或者hasPoints判断有问题
3. **H3: boardId格式问题** - key的格式`${boardId}_${row}_${col}`可能和实际数据不匹配
4. **H4: 节点类型判断问题** - 起始节点的type可能不是'start'，导致isStartNode判断失败
5. **H5: 数据结构问题** - board.grid可能为空或节点不存在

## Evidence Collection Plan
- 在handleNodeClick中添加日志，记录点击时的key、isAllocated、isReachable、isStartNode、hasPoints
- 在reachableNodes useMemo中添加日志，记录可达节点的数量和具体节点key
- 记录allocations的变化

## Instrumentation Applied
- App.tsx: reachableNodes useMemo - 添加了console.log调试日志
- App.tsx: handleNodeClick - 添加了console.log调试日志

## Progress
- [x] Step 1: Initialize debug file
- [x] Step 2: Instrumentation
- [ ] Step 3: Reproduce & Collect logs
- [ ] Step 4: Analyze evidence
- [ ] Step 5: Fix
- [ ] Step 6: Verify
- [ ] Step 7: Cleanup

## Server URL
http://localhost:5175/