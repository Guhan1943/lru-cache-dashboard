package com.example.lrucatch.contoller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.lrucatch.service.LRUCacheService;

@RestController
@RequestMapping("/api/cache")
@CrossOrigin(origins = "http://localhost:5173")
public class CacheController {

    private final LRUCacheService cacheService;

    public CacheController(LRUCacheService cacheService) {
        this.cacheService = cacheService;
    }

    @PostMapping("/put")
    public String put(@RequestParam int key, @RequestParam int value) {
        cacheService.put(key, value);
        return "Key " + key + " added with value " + value;
    }

    @GetMapping("/get/{key}")
    public int get(@PathVariable int key) {
        return cacheService.get(key);
    }

    @GetMapping("/all")
    public Map<Integer, Integer> getAll() {
        return cacheService.getAll();
    }
}
