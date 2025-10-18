package com.example.lrucatch.service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.lrucatch.model.Node;

@Service
public class LRUCacheService {
    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head, tail;

    public LRUCacheService() {
        this.capacity = 3;  // You can make it configurable
        this.map = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    // Remove node from linked list
    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    // Insert node at head (most recently used)
    private void insertToHead(Node node) {
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
        node.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;

        Node node = map.get(key);
        remove(node);
        insertToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        } else if (map.size() == capacity) {
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }

        Node newNode = new Node(key, value);
        insertToHead(newNode);
        map.put(key, newNode);
    }

    public Map<Integer, Integer> getAll() {
        Map<Integer, Integer> cacheView = new LinkedHashMap<>();
        Node curr = head.next;
        while (curr != tail) {
            cacheView.put(curr.key, curr.value);
            curr = curr.next;
        }
        return cacheView;
    }
}
